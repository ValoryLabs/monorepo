FROM ghcr.io/astral-sh/uv:latest

WORKDIR /app

# Копируем все файлы проекта сразу
COPY . .

# Устанавливаем зависимости
RUN uv sync --no-dev

ENV PATH="/app/.venv/bin:$PATH"

EXPOSE 8000

CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
