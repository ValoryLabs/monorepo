/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export enum MatchMode {
  Competitive = "Competitive",
  Unrated = "Unrated",
  Custom = "Custom",
  Practice = "Practice",
  Unknown = "Unknown",
}

export interface APIError {
  /**
   * @format int32
   * @min 0
   */
  code: number;
  details?: any;
  message: string;
  /**
   * @format int32
   * @min 0
   */
  status: number;
}

export interface AccountV1Data {
  /** @format int32 */
  account_level: number;
  card: AccountV1DataCard;
  last_update: string;
  /** @format int64 */
  last_update_raw: number;
  name: string;
  puuid: string;
  region: string;
  tag: string;
}

export interface AccountV1DataCard {
  id: string;
  large: string;
  small: string;
  wide: string;
}

export interface AccountV1Response {
  data: AccountV1Data;
  /**
   * @format int32
   * @min 0
   */
  status: number;
}

export interface AccountV2Data {
  /** @format int32 */
  account_level: number;
  card: string;
  name: string;
  platforms: string[];
  puuid: string;
  region: string;
  tag: string;
  title: string;
  updated_at: string;
}

export interface AccountV2Response {
  data: AccountV2Data;
  /**
   * @format int32
   * @min 0
   */
  status: number;
}

export interface AgentIdNameCombo {
  id: string;
  name: string;
}

export interface Bundle {
  CurrencyID: string;
  DataAssetID: string;
  /**
   * @format int32
   * @min 0
   */
  DurationRemainingInSeconds: number;
  ID: string;
  Items: BundleItem[];
  /** @format float */
  TotalDiscountPercent: number;
  WholesaleOnly: boolean;
}

export interface BundleItem {
  /** @format int32 */
  BasePrice: number;
  CurrencyID: string;
  /** @format float */
  DiscountPercent: number;
  /** @format float */
  DiscountedPrice: number;
  IsPromoItem: boolean;
  Item: Item;
}

export interface ContentItem {
  assetName: string;
  id?: string | null;
  localizedNames?: object | null;
  name: string;
}

export interface ContentV1 {
  acts: ContentItem[];
  ceremonies: ContentItem[];
  characters: ContentItem[];
  charmLevels: ContentItem[];
  charms: ContentItem[];
  chromas: ContentItem[];
  equips: ContentItem[];
  gameModes: ContentItem[];
  maps: ContentItem[];
  playerCards: ContentItem[];
  playerTitles: ContentItem[];
  skinLevels: ContentItem[];
  skins: ContentItem[];
  sprayLevels: ContentItem[];
  sprays: ContentItem[];
  version: string;
}

export interface ContentV1Response {
  data: ContentV1;
  /**
   * @format int32
   * @min 0
   */
  status: number;
}

export interface EsportsV1Data {
  date: string;
  league: EsportsV1DataLeague;
  match: EsportsV1DataMatch;
  state: string;
  tournament: EsportsV1DataTournament;
  type: string;
  vod?: string | null;
}

export interface EsportsV1DataLeague {
  icon: string;
  identifier: string;
  name: string;
  region: string;
}

export interface EsportsV1DataMatch {
  game_type: EsportsV1DataMatchGameType;
  id?: string | null;
  teams: EsportsV1DataMatchTeams[];
}

export interface EsportsV1DataMatchGameType {
  /** @format int32 */
  count?: number | null;
  type?: string | null;
}

export interface EsportsV1DataMatchTeams {
  code: string;
  /** @format int32 */
  game_wins: number;
  has_won: boolean;
  icon: string;
  name: string;
  record: EsportsV1DataMatchTeamsRecord;
}

export interface EsportsV1DataMatchTeamsRecord {
  /** @format int32 */
  losses: number;
  /** @format int32 */
  wins: number;
}

export interface EsportsV1DataTournament {
  name: string;
  season: string;
}

export interface EsportsV1Response {
  data: EsportsV1Data[];
  /**
   * @format int32
   * @min 0
   */
  status: number;
}

export interface FeaturedBundle {
  Bundle: Bundle;
  /**
   * @format int32
   * @min 0
   */
  BundleRemainingDurationInSeconds: number;
  Bundles: Bundle[];
}

export interface Item {
  /**
   * @format int32
   * @min 0
   */
  Amount: number;
  ItemID: string;
  ItemTypeID: string;
}

export interface LeaderboardPVPPlayer {
  IsAnonymized: boolean;
  IsBanned: boolean;
  PlayerCardID: string;
  TitleID: string;
  /**
   * @format int32
   * @min 0
   */
  competitiveTier: number;
  gameName: string;
  /**
   * @format int32
   * @min 0
   */
  leaderboardRank: number;
  /**
   * @format int32
   * @min 0
   */
  numberOfWins: number;
  puuid?: string | null;
  /**
   * @format int32
   * @min 0
   */
  rankedRating: number;
  tagLine: string;
}

export interface LeaderboardV2Response {
  /** @format int32 */
  immortal_1_threshold: number;
  /** @format int32 */
  immortal_2_threshold: number;
  /** @format int32 */
  immortal_3_threshold: number;
  /** @format int64 */
  last_update: number;
  /** @format int64 */
  next_update: number;
  players: LeaderboardPVPPlayer[];
  /** @format int32 */
  radiant_threshold: number;
  /** @format int32 */
  total_players: number;
}

export interface LeaderboardV3Data {
  players: LeaderboardV3DataPlayer[];
  thresholds: LeaderboardV3DataThreshold[];
  updated_at: string;
}

export interface LeaderboardV3DataPlayer {
  card: string;
  is_anonymized: boolean;
  is_banned: boolean;
  /** @format int32 */
  leaderboard_rank: number;
  name: string;
  puuid?: string | null;
  /** @format int32 */
  rr: number;
  tag: string;
  /** @format int32 */
  tier: number;
  title: string;
  updated_at: string;
  /** @format int32 */
  wins: number;
}

export interface LeaderboardV3DataThreshold {
  /** @format int32 */
  start_index: number;
  /** @format int32 */
  threshold: number;
  tier: LeaderboardV3DataThresholdTier;
}

export interface LeaderboardV3DataThresholdTier {
  /** @format int32 */
  id: number;
  name: string;
}

export interface LeaderboardV3Response {
  data: LeaderboardV3Data;
  results: Pagination;
  /**
   * @format int32
   * @min 0
   */
  status: number;
}

export interface MMRDataImages {
  large: string;
  small: string;
  triangle_down: string;
  triangle_up: string;
}

export interface MMRHistoryV1Data {
  /** @format int32 */
  currenttier: number;
  currenttierpatched: string;
  date: string;
  /** @format int32 */
  date_raw: number;
  /** @format int32 */
  elo: number;
  images: MMRDataImages;
  map: MMRHistoryV1DataMap;
  match_id: string;
  /** @format int32 */
  mmr_change_to_last_game: number;
  /** @format int32 */
  ranking_in_tier: number;
  season_id: string;
}

export interface MMRHistoryV1DataMap {
  id: string;
  name: string;
}

export interface MMRHistoryV1Response {
  data: MMRHistoryV1Data[];
  name: string;
  /**
   * @format int32
   * @min 0
   */
  status: number;
  tag: string;
}

export interface MMRHistoryV2Data {
  account: MMRV3Account;
  history: MMRHistoryV2History[];
}

export interface MMRHistoryV2History {
  date: string;
  /** @format int32 */
  elo: number;
  /** @format int32 */
  last_change: number;
  map: MapIdNameCombo;
  match_id: string;
  /** @format int32 */
  refunded_rr: number;
  /** @format int32 */
  rr: number;
  season: SeasonIdShortCombo;
  tier: TierIdNameCombo;
  was_derank_protected: boolean;
}

export interface MMRHistoryV2Response {
  data: MMRHistoryV2Data;
  /**
   * @format int32
   * @min 0
   */
  status: number;
}

export interface MMRV1Data {
  /** @format int32 */
  currenttier: number;
  currenttierpatched: string;
  /** @format int32 */
  elo: number;
  images: MMRDataImages;
  /** @format int32 */
  mmr_change_to_last_game: number;
  name: string;
  old: boolean;
  /** @format int32 */
  ranking_in_tier: number;
  tag: string;
}

export interface MMRV1Response {
  data: MMRV1Data;
  /**
   * @format int32
   * @min 0
   */
  status: number;
}

export interface MMRV2CurrentData {
  /** @format int32 */
  currenttier: number;
  currenttierpatched: string;
  /** @format int32 */
  elo: number;
  /** @format int32 */
  games_needed_for_rating: number;
  images: MMRDataImages;
  /** @format int32 */
  mmr_change_to_last_game: number;
  old: boolean;
  /** @format int32 */
  ranking_in_tier: number;
}

export interface MMRV2Data {
  by_season: any;
  current_data: MMRV2CurrentData;
  highest_rank: MMRV2HighestRank;
  name: string;
  puuid: string;
  tag: string;
}

export interface MMRV2HighestRank {
  old: boolean;
  patched_tier: string;
  season: string;
  /** @format int32 */
  tier: number;
}

export interface MMRV2Response {
  data: MMRV2Data;
  /**
   * @format int32
   * @min 0
   */
  status: number;
}

export interface MMRV3Account {
  name: string;
  puuid: string;
  tag: string;
}

export interface MMRV3Current {
  /** @format int32 */
  elo: number;
  /** @format int32 */
  games_needed_for_rating: number;
  /** @format int32 */
  last_change: number;
  leaderboard_placement?: null | MMRV3LeaderboardPlacement;
  /** @format int32 */
  rank_protection_shields: number;
  /** @format int32 */
  rr: number;
  tier: TierIdNameCombo;
}

export interface MMRV3Data {
  account: MMRV3Account;
  current: MMRV3Current;
  peak?: null | MMRV3Peak;
  seasonal: MMRV3Seasonal[];
}

export interface MMRV3LeaderboardPlacement {
  /**
   * @format int32
   * @min 0
   */
  rank: number;
  updated_at: string;
}

export interface MMRV3Peak {
  ranking_schema: string;
  /** @format int32 */
  rr: number;
  season: SeasonIdShortCombo;
  tier: TierIdNameCombo;
}

export interface MMRV3Response {
  data: MMRV3Data;
  /**
   * @format int32
   * @min 0
   */
  status: number;
}

export interface MMRV3Seasonal {
  act_wins: TierIdNameCombo[];
  /** @format int32 */
  end_rr: number;
  end_tier: TierIdNameCombo;
  /** @format int32 */
  games: number;
  leaderboard_placement?: null | MMRV3LeaderboardPlacement;
  ranking_schema: string;
  season: SeasonIdShortCombo;
  /** @format int32 */
  wins: number;
}

export interface MapIdNameCombo {
  id: string;
  name: string;
}

export interface MatchesV2Data {
  coaches: MatchesV2DataCoach[];
  kills: MatchesV2DataKill[];
  metadata: MatchesV2DataMetadata;
  observers: MatchesV2DataObserver[];
  players: MatchesV2DataPlayers;
  rounds: MatchesV2DataRound[];
  teams: MatchesV2DataTeams;
}

export interface MatchesV2DataCoach {
  puuid: string;
  team: string;
}

export interface MatchesV2DataKill {
  assistants: MatchesV2DataRoundPlayerStatsKillEventsAssistants[];
  damage_weapon_assets: MatchesV2DataRoundPlayerStatsKillEventsAssets;
  damage_weapon_id: string;
  damage_weapon_name?: string | null;
  /**
   * @format int64
   * @min 0
   */
  kill_time_in_match: number;
  /**
   * @format int64
   * @min 0
   */
  kill_time_in_round: number;
  killer_display_name: string;
  killer_puuid: string;
  killer_team: string;
  player_locations_on_kill: MatchesV2DataRoundPlayerLocationsOnEvent[];
  /**
   * @format int32
   * @min 0
   */
  round: number;
  secondary_fire_mode: boolean;
  victim_death_location: MatchesV2DataRoundEventLocation;
  victim_display_name: string;
  victim_puuid: string;
  victim_team: string;
}

export interface MatchesV2DataMetadata {
  cluster?: string | null;
  /**
   * @format int64
   * @min 0
   */
  game_length: number;
  /**
   * @format int64
   * @min 0
   */
  game_start: number;
  game_start_patched: string;
  game_version: string;
  map?: string | null;
  matchid: string;
  mode?: string | null;
  mode_id: string;
  platform: string;
  premier_info: MatchesV2DataMetadataPremierInfo;
  queue?: string | null;
  region?: string | null;
  /**
   * @format int32
   * @min 0
   */
  rounds_played: number;
  season_id: string;
}

export interface MatchesV2DataMetadataPremierInfo {
  matchup_id?: string | null;
  tournament_id?: string | null;
}

export interface MatchesV2DataObserver {
  /**
   * @format int32
   * @min 0
   */
  level: number;
  name: string;
  party_id: string;
  platform: MatchesV2DataPlatform;
  player_card: string;
  player_title: string;
  puuid: string;
  session_playtime: MatchesV2DataPlayerSessionPlaytime;
  tag: string;
  team: string;
}

export interface MatchesV2DataPlatform {
  os: MatchesV2DataPlatformOs;
  type: string;
}

export interface MatchesV2DataPlatformOs {
  name: string;
  version: string;
}

export interface MatchesV2DataPlayer {
  ability_casts: MatchesV2DataPlayerAbilityCasts;
  assets: MatchesV2DataPlayerAssets;
  behavior: MatchesV2DataPlayerBehavior;
  character?: string | null;
  /**
   * @format int32
   * @min 0
   */
  currenttier: number;
  currenttier_patched: string;
  /** @format int32 */
  damage_made: number;
  /** @format int32 */
  damage_received: number;
  economy: MatchesV2DataPlayerEconomy;
  /**
   * @format int32
   * @min 0
   */
  level: number;
  name: string;
  party_id: string;
  platform: MatchesV2DataPlatform;
  player_card: string;
  player_title: string;
  puuid: string;
  session_playtime: MatchesV2DataPlayerSessionPlaytime;
  stats: MatchesV2DataPlayerStats;
  tag: string;
  team: string;
}

export interface MatchesV2DataPlayerAbilityCasts {
  /**
   * @format int32
   * @min 0
   */
  c_cast?: number | null;
  /**
   * @format int32
   * @min 0
   */
  e_cast?: number | null;
  /**
   * @format int32
   * @min 0
   */
  q_cast?: number | null;
  /**
   * @format int32
   * @min 0
   */
  x_cast?: number | null;
}

export interface MatchesV2DataPlayerAssets {
  agent: MatchesV2DataPlayerAssetsAgent;
  card: MatchesV2DataPlayerAssetsCard;
}

export interface MatchesV2DataPlayerAssetsAgent {
  bust: string;
  full: string;
  killfeed: string;
  small: string;
}

export interface MatchesV2DataPlayerAssetsCard {
  large: string;
  small: string;
  wide: string;
}

export interface MatchesV2DataPlayerBehavior {
  /** @format float */
  afk_rounds: number;
  friendly_fire: MatchesV2DataPlayerBehaviorFriendlyFire;
  /** @format float */
  rounds_in_spawn?: number | null;
}

export interface MatchesV2DataPlayerBehaviorFriendlyFire {
  /** @format float */
  incoming?: number | null;
  /** @format float */
  outgoing?: number | null;
}

export interface MatchesV2DataPlayerEconomy {
  loadout_value: MatchesV2DataPlayerEconomyValue;
  spent: MatchesV2DataPlayerEconomyValue;
}

export interface MatchesV2DataPlayerEconomyValue {
  /** @format float */
  average: number;
  /** @format int32 */
  overall: number;
}

export interface MatchesV2DataPlayerSessionPlaytime {
  /**
   * @format int32
   * @min 0
   */
  milliseconds: number;
  /**
   * @format int32
   * @min 0
   */
  minutes: number;
  /**
   * @format int32
   * @min 0
   */
  seconds: number;
}

export interface MatchesV2DataPlayerStats {
  /**
   * @format int32
   * @min 0
   */
  assists: number;
  /**
   * @format int32
   * @min 0
   */
  bodyshots: number;
  /**
   * @format int32
   * @min 0
   */
  deaths: number;
  /**
   * @format int32
   * @min 0
   */
  headshots: number;
  /**
   * @format int32
   * @min 0
   */
  kills: number;
  /**
   * @format int32
   * @min 0
   */
  legshots: number;
  /** @format int32 */
  score: number;
}

export interface MatchesV2DataPlayers {
  all_players: MatchesV2DataPlayer[];
  blue: MatchesV2DataPlayer[];
  red: MatchesV2DataPlayer[];
}

export interface MatchesV2DataRound {
  bomb_defused: boolean;
  bomb_planted: boolean;
  defuse_events: MatchesV2DataRoundDefuseEvents;
  end_type: string;
  plant_events: MatchesV2DataRoundPlantEvents;
  player_stats: MatchesV2DataRoundPlayerStats[];
  winning_team: string;
}

export interface MatchesV2DataRoundDefuseEvents {
  defuse_location?: null | MatchesV2DataRoundEventLocation;
  /**
   * @format int64
   * @min 0
   */
  defuse_time_in_round?: number | null;
  defused_by?: null | MatchesV2DataRoundPlayer;
  player_locations_on_defuse?: any[] | null;
}

export interface MatchesV2DataRoundEventLocation {
  /** @format int32 */
  x: number;
  /** @format int32 */
  y: number;
}

export interface MatchesV2DataRoundPlantEvents {
  plant_location?: null | MatchesV2DataRoundEventLocation;
  plant_site?: string | null;
  /**
   * @format int64
   * @min 0
   */
  plant_time_in_round?: number | null;
  planted_by?: null | MatchesV2DataRoundPlayer;
  player_locations_on_plant?: any[] | null;
}

export interface MatchesV2DataRoundPlayer {
  display_name: string;
  puuid: string;
  team: string;
}

export interface MatchesV2DataRoundPlayerLocationsOnEvent {
  location: MatchesV2DataRoundEventLocation;
  player_display_name: string;
  player_puuid: string;
  player_team: string;
  /** @format float */
  view_radians: number;
}

export interface MatchesV2DataRoundPlayerStats {
  ability_casts: MatchesV2DataRoundPlayerStatsAbilityCasts;
  /**
   * @format int32
   * @min 0
   */
  bodyshots: number;
  /**
   * @format int32
   * @min 0
   */
  damage: number;
  damage_events: MatchesV2DataRoundPlayerStatsDamageEvents[];
  economy: MatchesV2DataRoundPlayerStatsEconomy;
  /**
   * @format int32
   * @min 0
   */
  headshots: number;
  kill_events: MatchesV2DataRoundPlayerStatsKillEvents[];
  /**
   * @format int32
   * @min 0
   */
  kills: number;
  /**
   * @format int32
   * @min 0
   */
  legshots: number;
  player_display_name: string;
  player_puuid: string;
  player_team: string;
  /** @format int32 */
  score: number;
  stayed_in_spawn: boolean;
  was_afk: boolean;
  was_penalized: boolean;
}

export interface MatchesV2DataRoundPlayerStatsAbilityCasts {
  /**
   * @format int32
   * @min 0
   */
  c_casts?: number | null;
  /**
   * @format int32
   * @min 0
   */
  e_casts?: number | null;
  /**
   * @format int32
   * @min 0
   */
  q_casts?: number | null;
  /**
   * @format int32
   * @min 0
   */
  x_casts?: number | null;
}

export interface MatchesV2DataRoundPlayerStatsDamageEvents {
  /**
   * @format int32
   * @min 0
   */
  bodyshots: number;
  /**
   * @format int32
   * @min 0
   */
  damage: number;
  /**
   * @format int32
   * @min 0
   */
  headshots: number;
  /**
   * @format int32
   * @min 0
   */
  legshots: number;
  receiver_display_name: string;
  receiver_puuid: string;
  receiver_team: string;
}

export interface MatchesV2DataRoundPlayerStatsEconomy {
  armor: MatchesV2DataRoundPlayerStatsEconomyEquipmentArmor;
  /**
   * @format int32
   * @min 0
   */
  loadout_value: number;
  /**
   * @format int32
   * @min 0
   */
  remaining: number;
  /** @format int32 */
  spent: number;
  weapon: MatchesV2DataRoundPlayerStatsEconomyEquipmentWeapon;
}

export interface MatchesV2DataRoundPlayerStatsEconomyEquipmentArmor {
  assets: MatchesV2DataRoundPlayerStatsEconomyEquipmentAssetsArmor;
  id?: string | null;
  name?: string | null;
}

export interface MatchesV2DataRoundPlayerStatsEconomyEquipmentAssets {
  display_icon?: string | null;
  killfeed_icon?: string | null;
}

export interface MatchesV2DataRoundPlayerStatsEconomyEquipmentAssetsArmor {
  display_icon?: string | null;
}

export interface MatchesV2DataRoundPlayerStatsEconomyEquipmentWeapon {
  assets: MatchesV2DataRoundPlayerStatsEconomyEquipmentAssets;
  id?: string | null;
  name?: string | null;
}

export interface MatchesV2DataRoundPlayerStatsKillEvents {
  assistants: MatchesV2DataRoundPlayerStatsKillEventsAssistants[];
  damage_weapon_assets: MatchesV2DataRoundPlayerStatsKillEventsAssets;
  damage_weapon_id: string;
  damage_weapon_name?: string | null;
  /**
   * @format int64
   * @min 0
   */
  kill_time_in_match: number;
  /**
   * @format int64
   * @min 0
   */
  kill_time_in_round: number;
  killer_display_name: string;
  killer_puuid: string;
  killer_team: string;
  player_locations_on_kill: MatchesV2DataRoundPlayerLocationsOnEvent[];
  secondary_fire_mode: boolean;
  victim_death_location: MatchesV2DataRoundEventLocation;
  victim_display_name: string;
  victim_puuid: string;
  victim_team: string;
}

export interface MatchesV2DataRoundPlayerStatsKillEventsAssets {
  display_icon?: string | null;
  killfeed_icon?: string | null;
}

export interface MatchesV2DataRoundPlayerStatsKillEventsAssistants {
  assistant_display_name: string;
  assistant_puuid: string;
  assistant_team: string;
}

export interface MatchesV2DataTeam {
  has_won?: boolean | null;
  roster?: null | MatchesV2DataTeamRoster;
  /**
   * @format int32
   * @min 0
   */
  rounds_lost?: number | null;
  /**
   * @format int32
   * @min 0
   */
  rounds_won?: number | null;
}

export interface MatchesV2DataTeamRoster {
  customization: MatchesV2DataTeamRosterCustomization;
  id: string;
  members: string[];
  name: string;
  tag: string;
}

export interface MatchesV2DataTeamRosterCustomization {
  icon: string;
  image: string;
  primary_color: string;
  secondary_color: string;
  tertiary_color: string;
}

export interface MatchesV2DataTeams {
  blue: MatchesV2DataTeam;
  red: MatchesV2DataTeam;
}

export interface MatchesV2Response {
  data: MatchesV2Data;
  /**
   * @format int32
   * @min 0
   */
  status: number;
}

export interface MatchesV3ListResponse {
  data: MatchesV3ListResponseData[];
  /**
   * @format int32
   * @min 0
   */
  status: number;
}

export interface MatchesV3ListResponseData {
  coaches: MatchesV2DataCoach[];
  is_available: boolean;
  kills: MatchesV2DataKill[];
  metadata?: null | MatchesV2DataMetadata;
  observers: MatchesV2DataObserver[];
  players?: null | MatchesV2DataPlayers;
  rounds: MatchesV2DataRound[];
  teams?: null | MatchesV2DataTeams;
}

export interface MatchesV4Data {
  coaches: MatchesV4DataCoach[];
  kills: MatchesV4DataKill[];
  metadata: MatchesV4DataMetadata;
  observers: MatchesV4DataObserver[];
  players: MatchesV4DataPlayer[];
  rounds: MatchesV4DataRound[];
  teams: MatchesV4DataTeam[];
}

export interface MatchesV4DataCoach {
  puuid: string;
  team_id: string;
}

export interface MatchesV4DataKill {
  assistants: MatchesV4DataRoundPlayer[];
  killer: MatchesV4DataRoundPlayer;
  location: MatchesV4DataRoundLocation;
  player_locations: MatchesV4DataRoundPlayerLocations[];
  /**
   * @format int32
   * @min 0
   */
  round: number;
  secondary_fire_mode: boolean;
  /**
   * @format int64
   * @min 0
   */
  time_in_match_in_ms: number;
  /**
   * @format int64
   * @min 0
   */
  time_in_round_in_ms: number;
  victim: MatchesV4DataRoundPlayer;
  weapon: MatchesV4DataRoundPlayerStatsEconomyWeapon;
}

export interface MatchesV4DataMetadata {
  cluster?: string | null;
  /**
   * @format int64
   * @min 0
   */
  game_length_in_ms: number;
  game_version: string;
  is_completed: boolean;
  map: MapIdNameCombo;
  match_id: string;
  party_rr_penaltys: MatchesV4DataMetadataPartyRRPenalty[];
  platform: string;
  /** @default null */
  premier?: any;
  queue: MatchesV4DataMetadataQueue;
  region?: string | null;
  season: SeasonIdShortCombo;
  started_at: string;
}

export interface MatchesV4DataMetadataPartyRRPenalty {
  party_id: string;
  /** @format float */
  penalty: number;
}

export interface MatchesV4DataMetadataQueue {
  id: string;
  mode_type?: string | null;
  name?: string | null;
}

export interface MatchesV4DataObserver {
  /**
   * @format int32
   * @min 0
   */
  account_level: number;
  card_id: string;
  name: string;
  party_id: string;
  puuid: string;
  /**
   * @format int32
   * @min 0
   */
  session_playtime_in_ms: number;
  tag: string;
  title_id: string;
}

export interface MatchesV4DataPlayer {
  ability_casts: MatchesV4DataPlayerAbilityCasts;
  /**
   * @format int32
   * @min 0
   */
  account_level: number;
  agent: AgentIdNameCombo;
  behavior: MatchesV4DataPlayerBehavior;
  customization: MatchesV4DataPlayerCustomization;
  economy: MatchesV4DataPlayerEconomy;
  name: string;
  party_id: string;
  platform: string;
  puuid: string;
  /**
   * @format int32
   * @min 0
   */
  session_playtime_in_ms: number;
  stats: MatchesV4DataPlayerStats;
  tag: string;
  team_id: string;
  tier: TierIdNameCombo;
}

export interface MatchesV4DataPlayerAbilityCasts {
  /**
   * @format int32
   * @min 0
   */
  ability1?: number | null;
  /**
   * @format int32
   * @min 0
   */
  ability2?: number | null;
  /**
   * @format int32
   * @min 0
   */
  grenade?: number | null;
  /**
   * @format int32
   * @min 0
   */
  ultimate?: number | null;
}

export interface MatchesV4DataPlayerBehavior {
  /** @format float */
  afk_rounds: number;
  friendly_fire: MatchesV4DataPlayerBehaviorFriendlyFire;
  /** @format float */
  rounds_in_spawn: number;
}

export interface MatchesV4DataPlayerBehaviorFriendlyFire {
  /** @format float */
  incoming: number;
  /** @format float */
  outgoing: number;
}

export interface MatchesV4DataPlayerCustomization {
  card: string;
  preferred_level_border?: string | null;
  title: string;
}

export interface MatchesV4DataPlayerEconomy {
  loadout_value: MatchesV4DataPlayerEconomyLoadoutValue;
  spent: MatchesV4DataPlayerEconomySpent;
}

export interface MatchesV4DataPlayerEconomyLoadoutValue {
  /** @format float */
  average: number;
  /** @format int32 */
  overall: number;
}

export interface MatchesV4DataPlayerEconomySpent {
  /** @format float */
  average: number;
  /** @format int32 */
  overall: number;
}

export interface MatchesV4DataPlayerStats {
  /**
   * @format int32
   * @min 0
   */
  assists: number;
  /**
   * @format int32
   * @min 0
   */
  bodyshots: number;
  damage: MatchesV4DataPlayerStatsDamage;
  /**
   * @format int32
   * @min 0
   */
  deaths: number;
  /**
   * @format int32
   * @min 0
   */
  headshots: number;
  /**
   * @format int32
   * @min 0
   */
  kills: number;
  /**
   * @format int32
   * @min 0
   */
  legshots: number;
  /** @format int32 */
  score: number;
}

export interface MatchesV4DataPlayerStatsDamage {
  /** @format int32 */
  dealt: number;
  /** @format int32 */
  received: number;
}

export interface MatchesV4DataRound {
  ceremony: string;
  defuse?: null | MatchesV4DataRoundDefuse;
  /**
   * @format int32
   * @min 0
   */
  id: number;
  plant?: null | MatchesV4DataRoundPlant;
  result: string;
  stats: MatchesV4DataRoundPlayerStats[];
  winning_team: string;
}

export interface MatchesV4DataRoundDefuse {
  location: MatchesV4DataRoundLocation;
  player: MatchesV4DataRoundPlayer;
  player_locations: MatchesV4DataRoundPlayerLocations[];
  /** @format int32 */
  round_time_in_ms: number;
}

export interface MatchesV4DataRoundLocation {
  /** @format int32 */
  x: number;
  /** @format int32 */
  y: number;
}

export interface MatchesV4DataRoundPlant {
  location: MatchesV4DataRoundLocation;
  player: MatchesV4DataRoundPlayer;
  player_locations: MatchesV4DataRoundPlayerLocations[];
  /** @format int32 */
  round_time_in_ms: number;
  site: string;
}

export interface MatchesV4DataRoundPlayer {
  name: string;
  puuid: string;
  tag: string;
  team: string;
}

export interface MatchesV4DataRoundPlayerLocations {
  location: MatchesV4DataRoundLocation;
  player: MatchesV4DataRoundPlayer;
  /** @format float */
  view_radians: number;
}

export interface MatchesV4DataRoundPlayerStats {
  ability_casts: MatchesV4DataRoundPlayerStatsAbilityCasts;
  damage_events: MatchesV4DataRoundPlayerStatsDamageEvents[];
  economy: MatchesV4DataRoundPlayerStatsEconomy;
  player: MatchesV4DataRoundPlayer;
  received_penalty: boolean;
  stats: MatchesV4DataRoundPlayerStatsStats;
  stayed_in_spawn: boolean;
  was_afk: boolean;
}

export interface MatchesV4DataRoundPlayerStatsAbilityCasts {
  /**
   * @format int32
   * @min 0
   */
  ability_1?: number | null;
  /**
   * @format int32
   * @min 0
   */
  ability_2?: number | null;
  /**
   * @format int32
   * @min 0
   */
  grenade?: number | null;
  /**
   * @format int32
   * @min 0
   */
  ultimate?: number | null;
}

export interface MatchesV4DataRoundPlayerStatsDamageEvents {
  /**
   * @format int32
   * @min 0
   */
  bodyshots: number;
  /**
   * @format int32
   * @min 0
   */
  damage: number;
  /**
   * @format int32
   * @min 0
   */
  headshots: number;
  /**
   * @format int32
   * @min 0
   */
  legshots: number;
  player: MatchesV4DataRoundPlayer;
}

export interface MatchesV4DataRoundPlayerStatsEconomy {
  armor?: null | MatchesV4DataRoundPlayerStatsEconomyArmor;
  /** @format int32 */
  loadout_value: number;
  /** @format int32 */
  remaining: number;
  weapon?: null | MatchesV4DataRoundPlayerStatsEconomyWeapon;
}

export interface MatchesV4DataRoundPlayerStatsEconomyArmor {
  id: string;
  name?: string | null;
}

export interface MatchesV4DataRoundPlayerStatsEconomyWeapon {
  id?: string | null;
  name?: string | null;
  type?: string | null;
}

export interface MatchesV4DataRoundPlayerStatsStats {
  /**
   * @format int32
   * @min 0
   */
  bodyshots: number;
  /**
   * @format int32
   * @min 0
   */
  headshots: number;
  /**
   * @format int32
   * @min 0
   */
  kills: number;
  /**
   * @format int32
   * @min 0
   */
  legshots: number;
  /** @format int32 */
  score: number;
}

export interface MatchesV4DataTeam {
  premier_roster?: null | MatchesV4DataTeamPremierRoster;
  rounds: MatchesV4DataTeamRounds;
  team_id: string;
  won: boolean;
}

export interface MatchesV4DataTeamPremierRoster {
  customization: MatchesV4DataTeamPremierRosterCustomization;
  id: string;
  members: string[];
  name: string;
  tag: string;
}

export interface MatchesV4DataTeamPremierRosterCustomization {
  icon: string;
  image: string;
  primary_color: string;
  secondary_color: string;
  tertiary_color: string;
}

export interface MatchesV4DataTeamRounds {
  /**
   * @format int32
   * @min 0
   */
  lost: number;
  /**
   * @format int32
   * @min 0
   */
  won: number;
}

export interface MatchesV4HistoryResponse {
  data: MatchesV4Data[];
  /**
   * @format int32
   * @min 0
   */
  status: number;
}

export interface MatchesV4Response {
  data: MatchesV4Data;
  /**
   * @format int32
   * @min 0
   */
  status: number;
}

export interface Pagination {
  /** @format int32 */
  after: number;
  /** @format int32 */
  before: number;
  /** @format int32 */
  returned: number;
  /** @format int32 */
  total: number;
}

export interface PremierSearchResponse {
  data: PremierTeamLiteResponseData[];
  /**
   * @format int32
   * @min 0
   */
  status: number;
}

export interface PremierTeamGamesLeagueString {
  id: string;
  /** @format int32 */
  points_after: number;
  /** @format int32 */
  points_before: number;
  started_at: string;
}

export interface PremierTeamGamesTournament {
  matches: string[];
  /** @format int32 */
  placement: number;
  /** @format int32 */
  placement_league_bonus: number;
  /** @format int32 */
  points_after: number;
  /** @format int32 */
  points_before: number;
  tournament_id: string;
}

export interface PremierTeamHistoryV1Response {
  data: PremierTeamHistoryV1ResponseData;
  /**
   * @format int32
   * @min 0
   */
  status: number;
}

export interface PremierTeamHistoryV1ResponseData {
  league_matches: PremierTeamGamesLeagueString[];
  tournament_matches: PremierTeamGamesTournament[];
}

export interface PremierTeamLiteResponseData {
  affinity: string;
  conference: string;
  customization: PremierTeamV1ResponseDataCustomization;
  /** @format int32 */
  division: number;
  id: string;
  /** @format int32 */
  losses: number;
  name: string;
  /** @format int32 */
  ranking: number;
  region: string;
  /** @format int32 */
  score: number;
  tag: string;
  updated_at: string;
  /** @format int32 */
  wins: number;
}

export interface PremierTeamMember {
  name?: string | null;
  puuid: string;
  tag?: string | null;
}

export interface PremierTeamV1Response {
  data: PremierTeamV1ResponseData;
  /**
   * @format int32
   * @min 0
   */
  status: number;
}

export interface PremierTeamV1ResponseData {
  customization: PremierTeamV1ResponseDataCustomization;
  enrolled: boolean;
  id: string;
  member: PremierTeamMember[];
  name: string;
  placement: PremierTeamV1ResponseDataPlacement;
  stats: PremierTeamV1ResponseDataStats;
  tag: string;
}

export interface PremierTeamV1ResponseDataCustomization {
  icon: string;
  image: string;
  primary: string;
  secondary: string;
  tertiary: string;
}

export interface PremierTeamV1ResponseDataPlacement {
  conference: string;
  /** @format int32 */
  division: number;
  /** @format int32 */
  place: number;
  /** @format int32 */
  points: number;
}

export interface PremierTeamV1ResponseDataStats {
  /** @format int32 */
  losses: number;
  /** @format int32 */
  matches: number;
  /** @format int32 */
  rounds_lost: number;
  /** @format int32 */
  rounds_won: number;
  /** @format int32 */
  wins: number;
}

export interface QueueStatusV1 {
  data: QueueStatusV1Data[];
  /**
   * @format int32
   * @min 0
   */
  status: number;
}

export interface QueueStatusV1Data {
  enabled: boolean;
  game_rules: QueueStatusV1GameRules;
  high_skill: QueueStatusV1HighSkill;
  maps: QueueStatusV1Maps[];
  mode: string;
  mode_id: string;
  /** @format int32 */
  number_of_teams: number;
  party_size: QueueStatusV1PartySize;
  platforms: string[];
  ranked: boolean;
  /** @format int32 */
  required_account_level: number;
  skill_disparity: QueueStatusV1SkillDisparity[];
  /** @format int32 */
  team_size: number;
  tournament: boolean;
}

export interface QueueStatusV1GameRules {
  allow_drop_out: boolean;
  allow_lenient_surrender: boolean;
  allow_overtime_draw_vote: boolean;
  assign_random_agents: boolean;
  overtime_win_by_two: boolean;
  overtime_win_by_two_capped: boolean;
  premier_mode: boolean;
  skip_pregame: boolean;
}

export interface QueueStatusV1HighSkill {
  /** @format int32 */
  max_party_size: number;
  /** @format int32 */
  max_tier: number;
  /** @format int32 */
  min_tier: number;
}

export interface QueueStatusV1IDNamePair {
  /** @min 0 */
  id: number;
  name: string;
}

export interface QueueStatusV1Map {
  id: string;
  name: string;
}

export interface QueueStatusV1Maps {
  enabled: boolean;
  map: QueueStatusV1Map;
}

export interface QueueStatusV1PartySize {
  full_party_bypass: boolean;
  invalid: number[];
  /** @format int32 */
  max: number;
  /** @format int32 */
  min: number;
}

export interface QueueStatusV1SkillDisparity {
  max_tier: QueueStatusV1IDNamePair;
  name: string;
  /** @format int32 */
  tier: number;
}

export interface RawV1ErrorData {
  /**
   * @format int32
   * @min 0
   */
  code: number;
  error: boolean;
  id: string;
}

export interface RawV1Payload {
  platform?: string | null;
  queries?: string | null;
  region: string;
  type: string;
  value: RawV1PayloadValues;
}

export type RawV1PayloadValues = string | string[];

export interface RawV1Response {
  data: RawV1ResponseData;
  /**
   * @format int32
   * @min 0
   */
  status: number;
}

export type RawV1ResponseData = any[] | RawV1ErrorData;

export interface SeasonIdShortCombo {
  id: string;
  short: string;
}

export interface SendError {
  errors: APIError[];
}

export interface StatusIncident {
  archive_at?: string | null;
  created_at: string;
  /**
   * @format int32
   * @min 0
   */
  id: number;
  incident_severity: string;
  maintenance_status?: string | null;
  platforms: string[];
  titles: StatusIncidentContent[];
  updated_at: string;
  updates: StatusIncidentUpdate[];
}

export interface StatusIncidentContent {
  content: string;
  locale: string;
}

export interface StatusIncidentUpdate {
  author: string;
  created_at: string;
  /**
   * @format int32
   * @min 0
   */
  id: number;
  publish: boolean;
  publish_locations: string[];
  translations: StatusIncidentContent[];
  updated_at: string;
}

export interface StatusV1 {
  data: StatusV1Data;
  /**
   * @format int32
   * @min 0
   */
  status: number;
}

export interface StatusV1Data {
  incidents: StatusIncident[];
  maintenances: StatusIncident[];
}

export interface StoreFeaturedV1 {
  FeaturedBundle: FeaturedBundle;
}

export interface StoreOffersV1 {
  Offers: StoreOffersV1Offer[];
  UpgradeCurrencyOffers: StoreOffersV1UpgradeCurrency[];
}

export interface StoreOffersV1Offer {
  Cost: Record<string, number>;
  IsDirectPurchase: boolean;
  OfferID: string;
  Rewards: StoreOffersV1Reward[];
  StartDate: string;
}

export interface StoreOffersV1Response {
  data: StoreOffersV1;
  /**
   * @format int32
   * @min 0
   */
  status: number;
}

export interface StoreOffersV1Reward {
  ItemID: string;
  ItemTypeID: string;
  /** @format int32 */
  Quantity: number;
}

export interface StoreOffersV1UpgradeCurrency {
  /** @format double */
  DiscountedPercent: number;
  Offer: StoreOffersV1Offer;
  OfferID: string;
  StorefrontItemID: string;
}

export interface StoredMMR {
  date: string;
  /** @format int32 */
  elo: number;
  /** @format int32 */
  last_mmr_change: number;
  map: StoredMMRMap;
  match_id: string;
  /**
   * @format int32
   * @min 0
   */
  ranking_in_tier: number;
  season: StoredMMRSeason;
  tier: StoredMMRTier;
}

export interface StoredMMRMap {
  id: string;
  name: string;
}

export interface StoredMMRResponse {
  data: StoredMMR[];
  results: Pagination;
  /**
   * @format int32
   * @min 0
   */
  status: number;
}

export interface StoredMMRSeason {
  id: string;
  short: string;
}

export interface StoredMMRTier {
  /** @format int32 */
  id: number;
  name: string;
}

export interface StoredMMRV2 {
  date: string;
  /** @format int32 */
  elo: number;
  /** @format int32 */
  last_change: number;
  map: MapIdNameCombo;
  match_id: string;
  /** @format int32 */
  refunded_rr: number;
  /** @format int32 */
  rr: number;
  season: SeasonIdShortCombo;
  tier: TierIdNameCombo;
  was_derank_protected: boolean;
}

export interface StoredMMRV2Response {
  data: StoredMMRV2[];
  results: Pagination;
  /**
   * @format int32
   * @min 0
   */
  status: number;
}

export interface StoredMatch {
  meta: StoredMatchMeta;
  stats: StoredMatchStats;
  teams: StoredMatchTeam;
}

export interface StoredMatchMeta {
  cluster?: string | null;
  id: string;
  map: StoredMatchMetaMap;
  mode: string;
  region: string;
  season: StoredMatchMetaSeason;
  started_at: string;
  version: string;
}

export interface StoredMatchMetaMap {
  id: string;
  name: string;
}

export interface StoredMatchMetaSeason {
  id: string;
  short: string;
}

export interface StoredMatchStats {
  /**
   * @format int32
   * @min 0
   */
  assists: number;
  character: StoredMatchStatsCharacter;
  damage: StoredMatchStatsDamage;
  /**
   * @format int32
   * @min 0
   */
  deaths: number;
  /**
   * @format int32
   * @min 0
   */
  kills: number;
  /**
   * @format int32
   * @min 0
   */
  level: number;
  puuid: string;
  /** @format int32 */
  score: number;
  shots: StoredMatchStatsShots;
  team: string;
  /**
   * @format int32
   * @min 0
   */
  tier: number;
}

export interface StoredMatchStatsCharacter {
  id: string;
  name: string;
}

export interface StoredMatchStatsDamage {
  /** @format int32 */
  made: number;
  /** @format int32 */
  received: number;
}

export interface StoredMatchStatsShots {
  /**
   * @format int32
   * @min 0
   */
  body: number;
  /**
   * @format int32
   * @min 0
   */
  head: number;
  /**
   * @format int32
   * @min 0
   */
  leg: number;
}

export interface StoredMatchTeam {
  /**
   * @format int32
   * @min 0
   */
  blue: number;
  /**
   * @format int32
   * @min 0
   */
  red: number;
}

export interface StoredMatchesResponse {
  data: StoredMatch[];
  results: Pagination;
  /**
   * @format int32
   * @min 0
   */
  status: number;
}

export interface TierIdNameCombo {
  /** @format int32 */
  id: number;
  name: string;
}

export interface VersionV1Data {
  branch: string;
  build_date: string;
  build_ver: string;
  last_checked: string;
  region: string;
  /**
   * @format int32
   * @min 0
   */
  version: number;
  version_for_api: string;
}

export interface VersionV1Response {
  data: VersionV1Data;
  /**
   * @format int32
   * @min 0
   */
  status: number;
}

export interface WebsiteByIdV1Data {
  banner_url?: string | null;
  category: string;
  content?: string | null;
  date: string;
  description?: string | null;
  external_link?: string | null;
  title: string;
  url: string;
}

export interface WebsiteByIdV1Response {
  data: WebsiteByIdV1Data;
  /**
   * @format int32
   * @min 0
   */
  status: number;
}

export interface WebsiteV1Data {
  banner_url?: string | null;
  category: string;
  date: string;
  description?: string | null;
  external_link?: string | null;
  id: string;
  title: string;
  url: string;
}

export interface WebsiteV1Response {
  data: WebsiteV1Data[];
  /**
   * @format int32
   * @min 0
   */
  status: number;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "https://api.henrikdev.xyz";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title HenrikDev API
 * @version 4.3.0
 * @license
 * @baseUrl https://api.henrikdev.xyz
 */
export class Api<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  valorant = {
    /**
     * No description
     *
     * @tags valorant
     * @name GetAccountV1
     * @request GET:/valorant/v1/account/{name}/{tag}
     * @response `200` `AccountV1Response` Account data retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Account not found
     * @response `500` `SendError` Internal Server Error
     */
    getAccountV1: (
      name: string,
      tag: string,
      query?: {
        /** Bypass cache and refresh (optional) */
        force?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<AccountV1Response, SendError>({
        path: `/valorant/v1/account/${name}/${tag}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name GetAccountByIdV1
     * @request GET:/valorant/v1/by-puuid/account/{puuid}
     * @response `200` `AccountV1Response` Account data retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Account not found
     * @response `500` `SendError` Internal Server Error
     */
    getAccountByIdV1: (
      puuid: string,
      query?: {
        /** Bypass cache and refresh (optional) */
        force?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<AccountV1Response, SendError>({
        path: `/valorant/v1/by-puuid/account/${puuid}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name StoredMatchesById
     * @request GET:/valorant/v1/by-puuid/lifetime/matches/{affinity}/{puuid}
     * @response `200` `StoredMatchesResponse` Stored match history retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Account not found
     * @response `500` `SendError` Internal Server Error
     */
    storedMatchesById: (
      affinity: string,
      puuid: string,
      query?: {
        /** Game mode filter (optional) */
        mode?: string;
        /** Map filter (optional) */
        map?: string;
        /**
         * Number of results (optional)
         * @format int32
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<StoredMatchesResponse, SendError>({
        path: `/valorant/v1/by-puuid/lifetime/matches/${affinity}/${puuid}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name StoredMmrHistoryById
     * @request GET:/valorant/v1/by-puuid/lifetime/mmr-history/{affinity}/{puuid}
     * @response `200` `StoredMMRResponse` Stored MMR history retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Account not found
     * @response `500` `SendError` Internal Server Error
     */
    storedMmrHistoryById: (
      affinity: string,
      puuid: string,
      query?: {
        /**
         * Number of results (optional)
         * @format int32
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<StoredMMRResponse, SendError>({
        path: `/valorant/v1/by-puuid/lifetime/mmr-history/${affinity}/${puuid}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name GetMmrHistoryById
     * @request GET:/valorant/v1/by-puuid/mmr-history/{affinity}/{puuid}
     * @response `200` `MMRHistoryV1Response` MMR history retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Account not found
     * @response `500` `SendError` Internal Server Error
     */
    getMmrHistoryById: (
      affinity: string,
      puuid: string,
      params: RequestParams = {},
    ) =>
      this.http.request<MMRHistoryV1Response, SendError>({
        path: `/valorant/v1/by-puuid/mmr-history/${affinity}/${puuid}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name GetMmrV1ById
     * @request GET:/valorant/v1/by-puuid/mmr/{affinity}/{puuid}
     * @response `200` `MMRV1Response` MMR data retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Account not found
     * @response `500` `SendError` Internal Server Error
     */
    getMmrV1ById: (
      affinity: string,
      puuid: string,
      params: RequestParams = {},
    ) =>
      this.http.request<MMRV1Response, SendError>({
        path: `/valorant/v1/by-puuid/mmr/${affinity}/${puuid}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name GetContentV1
     * @request GET:/valorant/v1/content
     * @response `200` `ContentV1Response` Content retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Content not found
     * @response `500` `SendError` Internal Server Error
     */
    getContentV1: (
      query?: {
        /** Locale code (e.g., en-US, de-DE) - optional */
        locale?: string;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<ContentV1Response, SendError>({
        path: `/valorant/v1/content`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name Crosshair
     * @request GET:/valorant/v1/crosshair/generate
     * @response `200` `void` Crosshair image generated successfully
     * @response `400` `SendError` Bad Request
     * @response `500` `SendError` Internal Server Error
     */
    crosshair: (
      query?: {
        /** Crosshair code */
        id?: string;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<void, SendError>({
        path: `/valorant/v1/crosshair/generate`,
        method: "GET",
        query: query,
        format: "blob",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name EsportsSchedulesV1
     * @request GET:/valorant/v1/esports/schedule
     * @response `200` `EsportsV1Response` Esports schedule retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Schedule not found
     * @response `500` `SendError` Internal Server Error
     */
    esportsSchedulesV1: (
      query?: {
        /** Region filter (optional) */
        region?: string;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<EsportsV1Response, SendError>({
        path: `/valorant/v1/esports/schedule`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name LeaderboardV1
     * @request GET:/valorant/v1/leaderboard/{affinity}
     * @response `200` `any` Leaderboard retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Leaderboard not found
     * @response `500` `SendError` Internal Server Error
     */
    leaderboardV1: (
      affinity: string,
      query?: {
        /** Season ID (optional) */
        season?: string;
        /** Player name to search for (optional) */
        name?: string;
        /** Player tag to search for (optional) */
        tag?: string;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<any, SendError>({
        path: `/valorant/v1/leaderboard/${affinity}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name StoredMatches
     * @request GET:/valorant/v1/lifetime/matches/{affinity}/{name}/{tag}
     * @response `200` `StoredMatchesResponse` Stored match history retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Account not found
     * @response `500` `SendError` Internal Server Error
     */
    storedMatches: (
      affinity: string,
      name: string,
      tag: string,
      query?: {
        /** Game mode filter (optional) */
        mode?: string;
        /** Map filter (optional) */
        map?: string;
        /**
         * Number of results (optional)
         * @format int32
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<StoredMatchesResponse, SendError>({
        path: `/valorant/v1/lifetime/matches/${affinity}/${name}/${tag}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name StoredMmrHistory
     * @request GET:/valorant/v1/lifetime/mmr-history/{affinity}/{name}/{tag}
     * @response `200` `StoredMMRResponse` Stored MMR history retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Account not found
     * @response `500` `SendError` Internal Server Error
     */
    storedMmrHistory: (
      affinity: string,
      name: string,
      tag: string,
      query?: {
        /**
         * Number of results (optional)
         * @format int32
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<StoredMMRResponse, SendError>({
        path: `/valorant/v1/lifetime/mmr-history/${affinity}/${name}/${tag}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name GetMmrHistoryByName
     * @request GET:/valorant/v1/mmr-history/{affinity}/{name}/{tag}
     * @response `200` `MMRHistoryV1Response` MMR history retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Account not found
     * @response `500` `SendError` Internal Server Error
     */
    getMmrHistoryByName: (
      affinity: string,
      name: string,
      tag: string,
      params: RequestParams = {},
    ) =>
      this.http.request<MMRHistoryV1Response, SendError>({
        path: `/valorant/v1/mmr-history/${affinity}/${name}/${tag}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name GetMmrV1ByName
     * @request GET:/valorant/v1/mmr/{affinity}/{name}/{tag}
     * @response `200` `MMRV1Response` MMR data retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Account not found
     * @response `500` `SendError` Internal Server Error
     */
    getMmrV1ByName: (
      affinity: string,
      name: string,
      tag: string,
      params: RequestParams = {},
    ) =>
      this.http.request<MMRV1Response, SendError>({
        path: `/valorant/v1/mmr/${affinity}/${name}/${tag}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name PremierLeaderboard
     * @request GET:/valorant/v1/premier/leaderboard/{affinity}
     * @response `200` `PremierSearchResponse` Premier leaderboard retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Leaderboard not found
     * @response `500` `SendError` Internal Server Error
     */
    premierLeaderboard: (
      affinity: string,
      query?: {
        /** Conference filter (optional) */
        conference?: string;
        /** Division filter (optional) */
        division?: string;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<PremierSearchResponse, SendError>({
        path: `/valorant/v1/premier/leaderboard/${affinity}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name PremierSearch
     * @request GET:/valorant/v1/premier/search
     * @response `200` `PremierSearchResponse` Premier team search results retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` No teams found
     * @response `500` `SendError` Internal Server Error
     */
    premierSearch: (
      query?: {
        /** Team name to search for (optional) */
        name?: string;
        /** Team tag to search for (optional) */
        tag?: string;
        /** Team UUID to search for (optional) */
        id?: string;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<PremierSearchResponse, SendError>({
        path: `/valorant/v1/premier/search`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name PremierById
     * @request GET:/valorant/v1/premier/{id}
     * @response `200` `PremierTeamV1Response` Premier team data retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Team not found
     * @response `500` `SendError` Internal Server Error
     */
    premierById: (id: string, params: RequestParams = {}) =>
      this.http.request<PremierTeamV1Response, SendError>({
        path: `/valorant/v1/premier/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name PremierByIdHistory
     * @request GET:/valorant/v1/premier/{id}/history
     * @response `200` `PremierTeamV1Response` Premier team history retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Team not found
     * @response `500` `SendError` Internal Server Error
     */
    premierByIdHistory: (id: string, params: RequestParams = {}) =>
      this.http.request<PremierTeamV1Response, SendError>({
        path: `/valorant/v1/premier/${id}/history`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name PremierByName
     * @request GET:/valorant/v1/premier/{name}/{tag}
     * @response `200` `PremierTeamV1Response` Premier team data retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Team not found
     * @response `500` `SendError` Internal Server Error
     */
    premierByName: (name: string, tag: string, params: RequestParams = {}) =>
      this.http.request<PremierTeamV1Response, SendError>({
        path: `/valorant/v1/premier/${name}/${tag}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name PremierByNameHistory
     * @request GET:/valorant/v1/premier/{name}/{tag}/history
     * @response `200` `PremierTeamHistoryV1Response` Premier team history retrieved successfully
     * @response `400` `void` Client error
     */
    premierByNameHistory: (
      name: string,
      tag: string,
      params: RequestParams = {},
    ) =>
      this.http.request<PremierTeamHistoryV1Response, void>({
        path: `/valorant/v1/premier/${name}/${tag}/history`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name QueueStatus
     * @request GET:/valorant/v1/queue-status/{affinity}
     * @response `200` `QueueStatusV1` Queue status retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Region not found
     * @response `500` `SendError` Internal Server Error
     */
    queueStatus: (affinity: string, params: RequestParams = {}) =>
      this.http.request<QueueStatusV1, SendError>({
        path: `/valorant/v1/queue-status/${affinity}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name Raw
     * @request POST:/valorant/v1/raw
     * @response `200` `RawV1Response` Raw Riot API data retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Resource not found
     * @response `500` `SendError` Internal Server Error
     */
    raw: (data: RawV1Payload, params: RequestParams = {}) =>
      this.http.request<RawV1Response, SendError>({
        path: `/valorant/v1/raw`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name Status
     * @request GET:/valorant/v1/status/{affinity}
     * @response `200` `StatusV1` Status retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Region not found
     * @response `500` `SendError` Internal Server Error
     */
    status: (affinity: string, params: RequestParams = {}) =>
      this.http.request<StatusV1, SendError>({
        path: `/valorant/v1/status/${affinity}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name Version
     * @request GET:/valorant/v1/version/{affinity}
     * @response `200` `VersionV1Response` Version data retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Region not found
     * @response `500` `SendError` Internal Server Error
     */
    version: (affinity: string, params: RequestParams = {}) =>
      this.http.request<VersionV1Response, SendError>({
        path: `/valorant/v1/version/${affinity}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name Website
     * @request GET:/valorant/v1/website/{country_code}
     * @response `200` `WebsiteV1Response` Website content retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Content not found
     * @response `500` `SendError` Internal Server Error
     */
    website: (
      countryCode: string,
      query?: {
        /** Category filter (optional) */
        category?: string;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<WebsiteV1Response, SendError>({
        path: `/valorant/v1/website/${countryCode}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name WebsiteById
     * @request GET:/valorant/v1/website/{country_code}/{db_id}
     * @response `200` `WebsiteByIdV1Response` Website entry retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Content not found
     * @response `500` `SendError` Internal Server Error
     */
    websiteById: (
      dbId: string,
      countryCode: string,
      params: RequestParams = {},
    ) =>
      this.http.request<WebsiteByIdV1Response, SendError>({
        path: `/valorant/v1/website/${countryCode}/${dbId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name GetAccountV2
     * @request GET:/valorant/v2/account/{name}/{tag}
     * @response `200` `AccountV2Response` Account data retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Account not found
     * @response `500` `SendError` Internal Server Error
     */
    getAccountV2: (
      name: string,
      tag: string,
      query?: {
        /** Bypass cache and refresh (optional) */
        force?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<AccountV2Response, SendError>({
        path: `/valorant/v2/account/${name}/${tag}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name GetAccountByIdV2
     * @request GET:/valorant/v2/by-puuid/account/{puuid}
     * @response `200` `AccountV2Response` Account data retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Account not found
     * @response `500` `SendError` Internal Server Error
     */
    getAccountByIdV2: (
      puuid: string,
      query?: {
        /** Bypass cache and refresh (optional) */
        force?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<AccountV2Response, SendError>({
        path: `/valorant/v2/by-puuid/account/${puuid}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name GetMmrHistoryV2ById
     * @request GET:/valorant/v2/by-puuid/mmr-history/{affinity}/{platform}/{puuid}
     * @response `200` `MMRHistoryV2Response` MMR history retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Account not found
     * @response `500` `SendError` Internal Server Error
     */
    getMmrHistoryV2ById: (
      affinity: string,
      platform: string,
      puuid: string,
      params: RequestParams = {},
    ) =>
      this.http.request<MMRHistoryV2Response, SendError>({
        path: `/valorant/v2/by-puuid/mmr-history/${affinity}/${platform}/${puuid}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name GetMmrV2ById
     * @request GET:/valorant/v2/by-puuid/mmr/{affinity}/{puuid}
     * @response `200` `MMRV2Response` MMR data retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Account not found
     * @response `500` `SendError` Internal Server Error
     */
    getMmrV2ById: (
      affinity: string,
      puuid: string,
      params: RequestParams = {},
    ) =>
      this.http.request<MMRV2Response, SendError>({
        path: `/valorant/v2/by-puuid/mmr/${affinity}/${puuid}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name StoredMmrHistoryV2ById
     * @request GET:/valorant/v2/by-puuid/stored-mmr-history/{affinity}/{platform}/{puuid}
     * @response `200` `StoredMMRV2Response` Stored MMR history retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Account not found
     * @response `500` `SendError` Internal Server Error
     */
    storedMmrHistoryV2ById: (
      affinity: string,
      platform: string,
      puuid: string,
      query?: {
        /**
         * Number of results (optional)
         * @format int32
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<StoredMMRV2Response, SendError>({
        path: `/valorant/v2/by-puuid/stored-mmr-history/${affinity}/${platform}/${puuid}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name LeaderboardV2
     * @request GET:/valorant/v2/leaderboard/{affinity}
     * @response `200` `LeaderboardV2Response` Leaderboard retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Leaderboard not found
     * @response `500` `SendError` Internal Server Error
     */
    leaderboardV2: (
      affinity: string,
      query?: {
        /** Season ID (optional) */
        season?: string;
        /** Player name to search for (optional) */
        name?: string;
        /** Player tag to search for (optional) */
        tag?: string;
        /** Player UUID to search for (optional) */
        puuid?: string;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<LeaderboardV2Response, SendError>({
        path: `/valorant/v2/leaderboard/${affinity}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name MatchV2
     * @request GET:/valorant/v2/match/{match_id}
     * @response `200` `MatchesV2Response` Match details retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Match not found
     * @response `500` `SendError` Internal Server Error
     */
    matchV2: (matchId: string, params: RequestParams = {}) =>
      this.http.request<MatchesV2Response, SendError>({
        path: `/valorant/v2/match/${matchId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name GetMmrHistoryV2ByName
     * @request GET:/valorant/v2/mmr-history/{affinity}/{platform}/{name}/{tag}
     * @response `200` `MMRHistoryV2Response` MMR history retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Account not found
     * @response `500` `SendError` Internal Server Error
     */
    getMmrHistoryV2ByName: (
      affinity: string,
      platform: string,
      name: string,
      tag: string,
      params: RequestParams = {},
    ) =>
      this.http.request<MMRHistoryV2Response, SendError>({
        path: `/valorant/v2/mmr-history/${affinity}/${platform}/${name}/${tag}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name GetMmrV2ByName
     * @request GET:/valorant/v2/mmr/{affinity}/{name}/{tag}
     * @response `200` `MMRV2Response` MMR data retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Account not found
     * @response `500` `SendError` Internal Server Error
     */
    getMmrV2ByName: (
      affinity: string,
      name: string,
      tag: string,
      params: RequestParams = {},
    ) =>
      this.http.request<MMRV2Response, SendError>({
        path: `/valorant/v2/mmr/${affinity}/${name}/${tag}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name StoredMmrHistoryV2
     * @request GET:/valorant/v2/stored-mmr-history/{affinity}/{platform}/{name}/{tag}
     * @response `200` `StoredMMRV2Response` Stored MMR history retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Account not found
     * @response `500` `SendError` Internal Server Error
     */
    storedMmrHistoryV2: (
      affinity: string,
      platform: string,
      name: string,
      tag: string,
      query?: {
        /**
         * Number of results (optional)
         * @format int32
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<StoredMMRV2Response, SendError>({
        path: `/valorant/v2/stored-mmr-history/${affinity}/${platform}/${name}/${tag}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name GetMatchesV3ById
     * @request GET:/valorant/v3/by-puuid/matches/{affinity}/{puuid}
     * @response `200` `MatchesV3ListResponse` Match history retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Account not found
     * @response `500` `SendError` Internal Server Error
     */
    getMatchesV3ById: (
      affinity: string,
      puuid: string,
      query?: {
        /** Game mode filter (optional) */
        mode?: string;
        /** Map filter (optional) */
        map?: string;
        /**
         * Number of results (optional)
         * @format int32
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<MatchesV3ListResponse, SendError>({
        path: `/valorant/v3/by-puuid/matches/${affinity}/${puuid}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name GetMmrV3ById
     * @request GET:/valorant/v3/by-puuid/mmr/{affinity}/{platform}/{puuid}
     * @response `200` `MMRV3Response` MMR data retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Account not found
     * @response `500` `SendError` Internal Server Error
     */
    getMmrV3ById: (
      affinity: string,
      platform: string,
      puuid: string,
      params: RequestParams = {},
    ) =>
      this.http.request<MMRV3Response, SendError>({
        path: `/valorant/v3/by-puuid/mmr/${affinity}/${platform}/${puuid}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name LeaderboardV3
     * @request GET:/valorant/v3/leaderboard/{affinity}/{platform}
     * @response `200` `LeaderboardV3Response` Leaderboard retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Leaderboard not found
     * @response `500` `SendError` Internal Server Error
     */
    leaderboardV3: (
      affinity: string,
      platform: string,
      query?: {
        /** Season ID (optional) */
        season?: string;
        /**
         * Number of results per page (optional)
         * @format int32
         */
        size?: number;
        /**
         * Page number (optional)
         * @format int32
         */
        page?: number;
        /** Player name to search for (optional) */
        name?: string;
        /** Player tag to search for (optional) */
        tag?: string;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<LeaderboardV3Response, SendError>({
        path: `/valorant/v3/leaderboard/${affinity}/${platform}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name GetMatchesV3ByName
     * @request GET:/valorant/v3/matches/{affinity}/{name}/{tag}
     * @response `200` `MatchesV3ListResponse` Match history retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Account not found
     * @response `500` `SendError` Internal Server Error
     */
    getMatchesV3ByName: (
      affinity: string,
      name: string,
      tag: string,
      query?: {
        /** Game mode filter (optional) */
        mode?: MatchMode;
        /** Map filter (optional) */
        map?: string;
        /**
         * Number of results (optional)
         * @format int32
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<MatchesV3ListResponse, SendError>({
        path: `/valorant/v3/matches/${affinity}/${name}/${tag}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name GetMmrV3ByName
     * @request GET:/valorant/v3/mmr/{affinity}/{platform}/{name}/{tag}
     * @response `200` `MMRV3Response` MMR data retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Account not found
     * @response `500` `SendError` Internal Server Error
     */
    getMmrV3ByName: (
      affinity: string,
      platform: string,
      name: string,
      tag: string,
      params: RequestParams = {},
    ) =>
      this.http.request<MMRV3Response, SendError>({
        path: `/valorant/v3/mmr/${affinity}/${platform}/${name}/${tag}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name GetMatchesV4ById
     * @request GET:/valorant/v4/by-puuid/matches/{affinity}/{platform}/{puuid}
     * @response `200` `MatchesV4HistoryResponse` Match history retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Account not found
     * @response `500` `SendError` Internal Server Error
     */
    getMatchesV4ById: (
      affinity: string,
      platform: string,
      puuid: string,
      query?: {
        /** Game mode filter (optional) */
        mode?: string;
        /** Map filter (optional) */
        map?: string;
        /**
         * Number of results (optional)
         * @format int32
         */
        size?: number;
        /**
         * Start index for pagination (optional)
         * @format int32
         */
        start?: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<MatchesV4HistoryResponse, SendError>({
        path: `/valorant/v4/by-puuid/matches/${affinity}/${platform}/${puuid}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name MatchV4
     * @request GET:/valorant/v4/match/{affinity}/{match_id}
     * @response `200` `MatchesV4Response` Match details retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Match not found
     * @response `500` `SendError` Internal Server Error
     */
    matchV4: (affinity: string, matchId: string, params: RequestParams = {}) =>
      this.http.request<MatchesV4Response, SendError>({
        path: `/valorant/v4/match/${affinity}/${matchId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name GetMatchesV4ByName
     * @request GET:/valorant/v4/matches/{affinity}/{platform}/{name}/{tag}
     * @response `200` `MatchesV4HistoryResponse` Match history retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Account not found
     * @response `500` `SendError` Internal Server Error
     */
    getMatchesV4ByName: (
      affinity: string,
      platform: string,
      name: string,
      tag: string,
      query?: {
        /** Game mode filter (optional) */
        mode?: string;
        /** Map filter (optional) */
        map?: string;
        /**
         * Number of results (optional)
         * @format int32
         */
        size?: number;
        /**
         * Start index for pagination (optional)
         * @format int32
         */
        start?: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<MatchesV4HistoryResponse, SendError>({
        path: `/valorant/v4/matches/${affinity}/${platform}/${name}/${tag}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name StoreFeatured
     * @request GET:/valorant/{version}/store-featured
     * @response `200` `StoreFeaturedV1` Store featured items retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Store data not found
     * @response `500` `SendError` Internal Server Error
     */
    storeFeatured: (version: string, params: RequestParams = {}) =>
      this.http.request<StoreFeaturedV1, SendError>({
        path: `/valorant/${version}/store-featured`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags valorant
     * @name StoreOffers
     * @request GET:/valorant/{version}/store-offers
     * @response `200` `StoreOffersV1Response` Store offers retrieved successfully
     * @response `400` `SendError` Bad Request
     * @response `404` `SendError` Store data not found
     * @response `500` `SendError` Internal Server Error
     */
    storeOffers: (version: string, params: RequestParams = {}) =>
      this.http.request<StoreOffersV1Response, SendError>({
        path: `/valorant/${version}/store-offers`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
