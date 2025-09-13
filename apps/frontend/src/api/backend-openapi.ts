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

/**
 * SortOrder
 * Enum for sort direction.
 */
export enum SortOrder {
  Asc = "asc",
  Desc = "desc",
}

/**
 * SortBy
 * Enum for sorting options.
 */
export enum SortBy {
  Followers = "followers",
  Viewers = "viewers",
  Username = "username",
  LiveStatus = "live_status",
}

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/** HdevApiKeyRequest */
export interface HdevApiKeyRequest {
  /** Hdev Api Key */
  hdev_api_key: string;
}

/** OverlaySettingsRequest */
export interface OverlaySettingsRequest {
  /** Overlaystyle */
  overlayStyle?: string | null;
  /** Backgroundcolor */
  backgroundColor?: string | null;
  /** Disabledbackground */
  disabledBackground?: boolean | null;
  /** Disabledborder */
  disabledBorder?: boolean | null;
  /** Disabledbackgroundgradient */
  disabledBackgroundGradient?: boolean | null;
  /** Disabledgloweffect */
  disabledGlowEffect?: boolean | null;
  /** Disabledpeakrankicon */
  disabledPeakRankIcon?: boolean | null;
  /** Disabledleaderboardplace */
  disabledLeaderboardPlace?: boolean | null;
  /** Disabledpeakrr */
  disabledPeakRR?: boolean | null;
  /** Textcolor */
  textColor?: string | null;
  /** Primarytextcolor */
  primaryTextColor?: string | null;
  /** Overlayfont */
  overlayFont?: string | null;
  /** Wincolor */
  winColor?: string | null;
  /** Losecolor */
  loseColor?: string | null;
  /** Disabledwinlose */
  disabledWinLose?: boolean | null;
  /** Disabledlastmatchpoints */
  disabledLastMatchPoints?: boolean | null;
  /** Disabledprogress */
  disabledProgress?: boolean | null;
  /** Progresscolor */
  progressColor?: string | null;
  /** Progressbgcolor */
  progressBgColor?: string | null;
}

/** RiotIDRequest */
export interface RiotIDRequest {
  /** Riot Id */
  riot_id: string;
}

/**
 * SOverlayResponse
 * Schema for API responses
 * @example {"background_color":"#07090E","disabled_background":false,"lose_color":"#FF7986","overlay_font":"Inter","overlay_style":"old","primary_color":"#f2f2f2","text_color":"#f2f2f2","win_color":"#00FFE3"}
 */
export interface SOverlayResponse {
  /**
   * Overlay Style
   * Overlay style variant
   * @default "old"
   */
  overlay_style?: SOverlayResponseOverlayStyleEnum;
  /**
   * Background Color
   * @default "#07090E"
   */
  background_color?: string;
  /**
   * Disabled Background
   * @default false
   */
  disabled_background?: boolean;
  /**
   * Disabled Border
   * @default false
   */
  disabled_border?: boolean;
  /**
   * Disabled Background Gradient
   * @default false
   */
  disabled_background_gradient?: boolean;
  /**
   * Disabled Glow Effect
   * @default false
   */
  disabled_glow_effect?: boolean;
  /**
   * Disabled Peak Rank Icon
   * @default false
   */
  disabled_peak_rank_icon?: boolean;
  /**
   * Disabled Leaderboard Place
   * @default false
   */
  disabled_leaderboard_place?: boolean;
  /**
   * Disabled Peak Rr
   * @default false
   */
  disabled_peak_rr?: boolean;
  /**
   * Text Color
   * @default "#f2f2f2"
   */
  text_color?: string;
  /**
   * Primary Color
   * @default "#f2f2f2"
   */
  primary_color?: string;
  /**
   * Overlay Font
   * @default "Inter"
   */
  overlay_font?: string;
  /**
   * Win Color
   * @default "#00FFE3"
   */
  win_color?: string;
  /**
   * Lose Color
   * @default "#FF7986"
   */
  lose_color?: string;
  /**
   * Disabled Win Lose
   * @default false
   */
  disabled_win_lose?: boolean;
  /**
   * Disabled Last Match Points
   * @default false
   */
  disabled_last_match_points?: boolean;
  /**
   * Disabled Progress
   * @default false
   */
  disabled_progress?: boolean;
  /**
   * Progress Color
   * @default "#00FFE3"
   */
  progress_color?: string;
  /**
   * Progress Bg Color
   * @default "#f2f2f2"
   */
  progress_bg_color?: string;
  /**
   * Id
   * Overlay UUID
   * @format uuid
   */
  id: string;
  /**
   * Riot Id
   * User Riot ID
   */
  riot_id?: string | null;
  /**
   * Hdev Api Key
   * Henrik Dev API key
   */
  hdev_api_key?: string | null;
}

/** StreamerResponse */
export interface StreamerResponse {
  /** Username */
  username: string;
  /** Followers */
  followers: string;
  /** Img */
  img: string;
  /** Live */
  live: boolean;
  /** Verified */
  verified: boolean;
  /** Viewers */
  viewers?: number | null;
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
}

/**
 * Overlay Style
 * Overlay style variant
 * @default "old"
 */
export enum SOverlayResponseOverlayStyleEnum {
  Old = "old",
  New = "new",
  Minimal = "minimal",
  NewV2 = "new_v2",
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
  public baseUrl: string = "";
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
 * @title VALORY
 * @version 2.0.0
 *
 * API v2
 */
export class Api<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  api = {
    /**
     * @description Redirect user to Twitch authorization page with enhanced security. Generates and caches a secure state parameter to prevent CSRF attacks.
     *
     * @tags Auth & Tokens
     * @name TwitchLoginApiAuthLoginTwitchGet
     * @summary Initiate Twitch OAuth login
     * @request GET:/api/auth/login/twitch
     * @response `200` `any` Successful Response
     */
    twitchLoginApiAuthLoginTwitchGet: (params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/api/auth/login/twitch`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Handle Twitch OAuth callback with enhanced security and Redis caching.
     *
     * @tags Auth & Tokens
     * @name CallbackApiAuthCallbackGet
     * @summary Handle Twitch OAuth callback
     * @request GET:/api/auth/callback
     * @response `200` `any` Successful Response
     */
    callbackApiAuthCallbackGet: (params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/api/auth/callback`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name ReadUsersMeApiUsersMeGet
     * @summary Получить информацию о текущем пользователе
     * @request GET:/api/users/me
     * @response `200` `Record<string,any>` Successful Response
     * @response `422` `HTTPValidationError` Validation Error
     */
    readUsersMeApiUsersMeGet: (params: RequestParams = {}) =>
      this.http.request<Record<string, any>, HTTPValidationError>({
        path: `/api/users/me`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name SetRiotIdApiUsersMeRiotidPost
     * @summary Установить Riot ID
     * @request POST:/api/users/me/riotid
     * @response `200` `any` Successful Response
     * @response `422` `HTTPValidationError` Validation Error
     */
    setRiotIdApiUsersMeRiotidPost: (
      data: RiotIDRequest,
      params: RequestParams = {},
    ) =>
      this.http.request<any, HTTPValidationError>({
        path: `/api/users/me/riotid`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name SetHdevApiKeyApiUsersMeHdevApiKeyPost
     * @summary Установить HDEV API key
     * @request POST:/api/users/me/hdev_api_key
     * @response `200` `any` Successful Response
     * @response `422` `HTTPValidationError` Validation Error
     */
    setHdevApiKeyApiUsersMeHdevApiKeyPost: (
      data: HdevApiKeyRequest,
      params: RequestParams = {},
    ) =>
      this.http.request<any, HTTPValidationError>({
        path: `/api/users/me/hdev_api_key`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name SaveOverlaySettingsApiUsersMeOverlayPost
     * @summary Сохранить настройки оверлея
     * @request POST:/api/users/me/overlay
     * @response `200` `any` Successful Response
     * @response `422` `HTTPValidationError` Validation Error
     */
    saveOverlaySettingsApiUsersMeOverlayPost: (
      data: OverlaySettingsRequest,
      params: RequestParams = {},
    ) =>
      this.http.request<any, HTTPValidationError>({
        path: `/api/users/me/overlay`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieves a specific overlay by its ID.
     *
     * @tags Overlay
     * @name GetOverlayApiOverlayOverlayIdGet
     * @summary Get Overlay
     * @request GET:/api/overlay/{overlay_id}
     * @response `200` `SOverlayResponse` Successful Response
     * @response `422` `HTTPValidationError` Validation Error
     */
    getOverlayApiOverlayOverlayIdGet: (
      overlayId: string,
      params: RequestParams = {},
    ) =>
      this.http.request<SOverlayResponse, HTTPValidationError>({
        path: `/api/overlay/${overlayId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Utilities
     * @name PingApiUtilsPingGet
     * @summary Ping
     * @request GET:/api/utils/ping
     * @response `200` `any` Successful Response
     */
    pingApiUtilsPingGet: (params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/api/utils/ping`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get list of streamers who are currently live streaming. Data is fetched in real-time from Twitch API. Args: limit: Maximum number of streamers to return verified_only: Return only verified streamers refresh_cache: Force refresh cache from Twitch API cache: Redis cache instance
     *
     * @tags Streamers
     * @name GetOnlineStreamersApiStreamersOnlineGet
     * @summary Get online streamers
     * @request GET:/api/streamers/online
     * @response `200` `(StreamerResponse)[]` Successful Response
     * @response `422` `HTTPValidationError` Validation Error
     */
    getOnlineStreamersApiStreamersOnlineGet: (
      query?: {
        /**
         * Limit
         * Limit number of streamers returned
         */
        limit?: number | null;
        /**
         * Verified Only
         * Return only verified streamers
         * @default false
         */
        verified_only?: boolean;
        /**
         * Refresh Cache
         * Force refresh cache from Twitch API
         * @default false
         */
        refresh_cache?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<StreamerResponse[], HTTPValidationError>({
        path: `/api/streamers/online`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get list of all streamers with real-time data from Twitch API. Args: live_only: Return only live streamers verified_only: Return only verified streamers limit: Maximum number of streamers to return refresh_cache: Force refresh cache from Twitch API cache: Redis cache instance
     *
     * @tags Streamers
     * @name GetAllStreamersApiStreamersGet
     * @summary Get all streamers
     * @request GET:/api/streamers/
     * @response `200` `(StreamerResponse)[]` Successful Response
     * @response `422` `HTTPValidationError` Validation Error
     */
    getAllStreamersApiStreamersGet: (
      query?: {
        /**
         * Live Only
         * Return only live streamers
         * @default false
         */
        live_only?: boolean;
        /**
         * Verified Only
         * Return only verified streamers
         * @default false
         */
        verified_only?: boolean;
        /**
         * Limit
         * Limit number of streamers returned
         */
        limit?: number | null;
        /**
         * Refresh Cache
         * Force refresh cache from Twitch API
         * @default false
         */
        refresh_cache?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<StreamerResponse[], HTTPValidationError>({
        path: `/api/streamers/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get real-time statistics about streamers. Args: refresh_cache: Force refresh cache from Twitch API cache: Redis cache instance
     *
     * @tags Streamers
     * @name GetStreamersStatsApiStreamersStatsGet
     * @summary Get streamers statistics
     * @request GET:/api/streamers/stats
     * @response `200` `Record<string,any>` Successful Response
     * @response `422` `HTTPValidationError` Validation Error
     */
    getStreamersStatsApiStreamersStatsGet: (
      query?: {
        /**
         * Refresh Cache
         * Force refresh cache from Twitch API
         * @default false
         */
        refresh_cache?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<Record<string, any>, HTTPValidationError>({
        path: `/api/streamers/stats`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get list of streamers sorted by specified criteria. Args: sort_by: Field to sort by (followers, viewers, username, live_status) sort_order: Sort direction (asc, desc) live_only: Return only live streamers verified_only: Return only verified streamers limit: Maximum number of streamers to return refresh_cache: Force refresh cache from Twitch API cache: Redis cache instance
     *
     * @tags Streamers
     * @name GetSortedStreamersApiStreamersSortedGet
     * @summary Get sorted streamers
     * @request GET:/api/streamers/sorted
     * @response `200` `(StreamerResponse)[]` Successful Response
     * @response `422` `HTTPValidationError` Validation Error
     */
    getSortedStreamersApiStreamersSortedGet: (
      query?: {
        /**
         * Sort streamers by field
         * @default "followers"
         */
        sort_by?: SortBy;
        /**
         * Sort direction
         * @default "desc"
         */
        sort_order?: SortOrder;
        /**
         * Live Only
         * Return only live streamers
         * @default false
         */
        live_only?: boolean;
        /**
         * Verified Only
         * Return only verified streamers
         * @default false
         */
        verified_only?: boolean;
        /**
         * Limit
         * Limit number of streamers returned
         */
        limit?: number | null;
        /**
         * Refresh Cache
         * Force refresh cache from Twitch API
         * @default false
         */
        refresh_cache?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<StreamerResponse[], HTTPValidationError>({
        path: `/api/streamers/sorted`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get top streamers by specified criteria. Args: by: Criteria for ranking (followers, viewers, etc.) limit: Number of top streamers to return live_only: Consider only live streamers verified_only: Consider only verified streamers refresh_cache: Force refresh cache from Twitch API cache: Redis cache instance
     *
     * @tags Streamers
     * @name GetTopStreamersApiStreamersTopGet
     * @summary Get top streamers
     * @request GET:/api/streamers/top
     * @response `200` `(StreamerResponse)[]` Successful Response
     * @response `422` `HTTPValidationError` Validation Error
     */
    getTopStreamersApiStreamersTopGet: (
      query?: {
        /**
         * Criteria for top streamers
         * @default "followers"
         */
        by?: SortBy;
        /**
         * Limit
         * Number of top streamers to return
         * @min 1
         * @max 50
         * @default 10
         */
        limit?: number;
        /**
         * Live Only
         * Consider only live streamers
         * @default false
         */
        live_only?: boolean;
        /**
         * Verified Only
         * Consider only verified streamers
         * @default false
         */
        verified_only?: boolean;
        /**
         * Refresh Cache
         * Force refresh cache from Twitch API
         * @default false
         */
        refresh_cache?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<StreamerResponse[], HTTPValidationError>({
        path: `/api/streamers/top`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get streamers with mixed sorting (e.g., live status first, then by followers). Args: primary_sort: Primary sort criteria secondary_sort: Secondary sort criteria sort_order: Sort direction verified_only: Return only verified streamers limit: Maximum number of streamers to return refresh_cache: Force refresh cache from Twitch API cache: Redis cache instance
     *
     * @tags Streamers
     * @name GetMixedSortedStreamersApiStreamersMixedSortGet
     * @summary Get streamers with mixed sorting
     * @request GET:/api/streamers/mixed-sort
     * @response `200` `(StreamerResponse)[]` Successful Response
     * @response `422` `HTTPValidationError` Validation Error
     */
    getMixedSortedStreamersApiStreamersMixedSortGet: (
      query?: {
        /**
         * Primary sort criteria
         * @default "live_status"
         */
        primary_sort?: SortBy;
        /**
         * Secondary sort criteria
         * @default "followers"
         */
        secondary_sort?: SortBy;
        /**
         * Sort direction
         * @default "desc"
         */
        sort_order?: SortOrder;
        /**
         * Verified Only
         * Return only verified streamers
         * @default false
         */
        verified_only?: boolean;
        /**
         * Limit
         * Limit number of streamers returned
         */
        limit?: number | null;
        /**
         * Refresh Cache
         * Force refresh cache from Twitch API
         * @default false
         */
        refresh_cache?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<StreamerResponse[], HTTPValidationError>({
        path: `/api/streamers/mixed-sort`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
}
