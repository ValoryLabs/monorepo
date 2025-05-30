import uuid

from pydantic import BaseModel, Field, field_validator
from typing import Literal
import re


class SOverlay(BaseModel):
    """Enhanced Pydantic v2 schema with custom validators"""

    overlay_style: Literal["old", "modern", "minimal"] = Field(
        default="old",
        description="Overlay style variant"
    )

    background_color: str = Field(default="#07090E")
    disabled_background: bool = Field(default=False)
    disabled_border: bool = Field(default=False)
    disabled_background_gradient: bool = Field(default=False)
    disabled_glow_effect: bool = Field(default=False)

    disabled_peak_rank_icon: bool = Field(default=False)
    disabled_leaderboard_place: bool = Field(default=False)
    disabled_peak_rr: bool = Field(default=False)

    text_color: str = Field(default="#f2f2f2")
    primary_color: str = Field(default="#f2f2f2")
    overlay_font: str = Field(default="Inter")

    win_color: str = Field(default="#00FFE3")
    lose_color: str = Field(default="#FF7986")
    disabled_win_lose: bool = Field(default=False)
    disabled_last_match_points: bool = Field(default=False)

    disabled_progress: bool = Field(default=False)
    progress_color: str = Field(default="#00FFE3")
    progress_bg_color: str = Field(default="#f2f2f2")

    @field_validator('background_color', 'text_color', 'primary_color', 'win_color', 'lose_color', 'progress_color',
                     'progress_bg_color')
    @classmethod
    def validate_hex_color(cls, v: str) -> str:
        """Validate hex color format"""
        if not re.match(r'^#[0-9A-Fa-f]{6}$', v):
            raise ValueError('Color must be in hex format (#RRGGBB)')
        return v.upper()

    @field_validator('overlay_font')
    @classmethod
    def validate_font(cls, v: str) -> str:
        """Validate font name"""
        allowed_fonts = [
          'Roboto',
          'Open Sans',
          'Montserrat',
          'Lato',
          'Poppins',
          'Inter',
          'DM Sans',
          'Public Sans',
          'Manrope',
          'Sora',
          'Outfit',
          'Urbanist',
          'Space Grotesk',
          'Geist',
          'JetBrains Mono',
          'Space Mono',
          'Geist Mono',
          'Lora',
          'Rajdhani',
          'Gabarito',
          'Oxanium',
          'Russo one',
          'Bricolage Grotesque',
          'Onest',
        ]
        if v not in allowed_fonts:
            raise ValueError(f'Font must be one of: {", ".join(allowed_fonts)}')
        return v

    model_config = {
        "str_strip_whitespace": True,
        "validate_assignment": True,
        "extra": "forbid",
        "json_schema_extra": {
            "example": {
                "overlay_style": "old",
                "background_color": "#07090E",
                "disabled_background": False,
                "text_color": "#f2f2f2",
                "primary_color": "#f2f2f2",
                "overlay_font": "Inter",
                "win_color": "#00FFE3",
                "lose_color": "#FF7986"
            }
        }
    }


class SOverlayCreate(SOverlay):
    """Schema for creating overlay settings"""
    pass


class SOverlayResponse(SOverlay):
    """Schema for API responses"""

    id: uuid.UUID = Field(description="Overlay UUID")
    user_id: int = Field(description="User ID")

    class Config:
        from_attributes = True
