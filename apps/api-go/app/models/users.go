package models

import (
	"time"
)

type User struct {
	ID                uint      `gorm:"primaryKey;autoIncrement;comment:Unique identifier for the user" json:"id"`
	Username          string    `gorm:"type:varchar(50);not null;uniqueIndex;comment:Unique username for application login" json:"username"`
	BroadcasterType   *string   `gorm:"type:varchar(50);comment:Type of broadcaster (e.g., affiliate, partner, etc.)" json:"broadcaster_type"`
	AvatarURL         *string   `gorm:"type:varchar(500);comment:URL to user's profile picture" json:"avatar_url"`
	TwitchID          *string   `gorm:"type:varchar(100);uniqueIndex;comment:Twitch platform user identifier" json:"twitch_id"`
	TwitchDisplayName *string   `gorm:"type:varchar(100);comment:Display name shown on Twitch platform" json:"twitch_display_name"`
	RiotID            *string   `gorm:"type:varchar(100);comment:Riot Games account identifier (username#tag format)" json:"riot_id"`
	HdevAPIKey        *string   `gorm:"type:varchar(200);comment:Henrik Dev API key for VALORANT statistics access" json:"hdev_api_key"`
	IsActive          bool      `gorm:"not null;default:true;comment:Account status flag - False for suspended/deleted accounts" json:"is_active"`
	CreatedAt         time.Time `gorm:"not null;autoCreateTime;comment:Account creation timestamp" json:"created_at"`
	UpdatedAt         time.Time `gorm:"not null;autoUpdateTime;comment:Last account modification timestamp" json:"updated_at"`
	// Overlays []Overlay `gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE;comment:User's overlay configurations for streaming" json:"overlays"`
}
