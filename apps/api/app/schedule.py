import logging
from datetime import datetime, timedelta
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.interval import IntervalTrigger
from apscheduler.executors.asyncio import AsyncIOExecutor

from app.config import settings
from app.db.redis import redis_manager
from app.routers.streamers import update_streamers_cache

logger = logging.getLogger(__name__)


class StreamerScheduler:
    """Scheduler for automatic streamer data updates using AsyncIOScheduler."""

    def __init__(self):
        # Configure scheduler with performance optimizations
        executors = {
            'default': AsyncIOExecutor(max_workers=1)  # Single worker for streamer updates
        }
        
        job_defaults = {
            'coalesce': True,
            'max_instances': 1,
            'misfire_grace_time': 120
        }
        
        self.scheduler = AsyncIOScheduler(
            executors=executors,
            job_defaults=job_defaults,
            timezone='UTC'
        )
        self.is_running = False
        self.consecutive_failures = 0
        self.max_consecutive_failures = 3

    async def update_streamers_task(self):
        """Background task to update streamers data."""
        try:
            logger.info("Starting scheduled streamers update")

            # Get Redis connection
            redis_client = await redis_manager.get_redis()

            # Update streamers cache
            updated_data = await update_streamers_cache(redis_client)

            if updated_data:
                online_count = len([s for s in updated_data if s.get("live", False)])
                logger.info(f"Successfully updated {len(updated_data)} streamers, {online_count} online")
                self.consecutive_failures = 0  # Reset failure counter
            else:
                logger.warning("No data returned from streamers update")
                self.consecutive_failures += 1

        except Exception as e:
            logger.error(f"Failed to update streamers data: {str(e)}")
            self.consecutive_failures += 1

        # If too many consecutive failures, log warning
        if self.consecutive_failures >= self.max_consecutive_failures:
            logger.warning(f"Too many consecutive failures ({self.consecutive_failures})")

    def start(self):
        """Start the scheduler."""
        if not self.is_running:
            try:
                # Add job to run based on configuration (default every 5 minutes)
                update_interval = getattr(settings, 'SCHEDULER_UPDATE_INTERVAL', 5)
                self.scheduler.add_job(
                    func=self.update_streamers_task,
                    trigger=IntervalTrigger(minutes=update_interval),
                    id='update_streamers',
                    name='Update Streamers Data',
                    replace_existing=True,
                    max_instances=1,
                    coalesce=True,
                    misfire_grace_time=120,  # Increased grace time
                    # Jitter to prevent thundering herd
                    jitter=30
                )

                self.scheduler.start()
                self.is_running = True
                logger.info("Streamer scheduler started - updates every 5 minutes")

                # Run initial update after a delay
                self.scheduler.add_job(
                    func=self.update_streamers_task,
                    trigger='date',
                    run_date=datetime.now() + timedelta(seconds=30),
                    id='initial_update',
                    name='Initial Streamers Update'
                )

            except Exception as e:
                logger.error(f"Failed to start scheduler: {str(e)}")

    def stop(self):
        """Stop the scheduler."""
        if self.is_running:
            try:
                self.scheduler.shutdown(wait=False)
                self.is_running = False
                logger.info("Streamer scheduler stopped")
            except Exception as e:
                logger.error(f"Error stopping scheduler: {str(e)}")

    def get_job_info(self):
        """Get information about scheduled jobs."""
        jobs = []
        for job in self.scheduler.get_jobs():
            jobs.append({
                "id": job.id,
                "name": job.name,
                "next_run": job.next_run_time.isoformat() if job.next_run_time else None,
                "trigger": str(job.trigger)
            })
        return jobs


# Global scheduler instance
streamer_scheduler = StreamerScheduler()
