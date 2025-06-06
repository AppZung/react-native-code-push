#import "CodePush.h"
#import <UIKit/UIKit.h>

@implementation CodePushConfig {
    NSMutableDictionary *_configDictionary;
}

static CodePushConfig *_currentConfig;

static NSString * const AppVersionConfigKey = @"appVersion";
static NSString * const BuildVersionConfigKey = @"buildVersion";
static NSString * const ClientUniqueIDConfigKey = @"clientUniqueId";
static NSString * const ReleaseChannelPublicIDConfigKey = @"releaseChannelPublicId";
static NSString * const ServerURLConfigKey = @"serverUrl";
static NSString * const PublicKeyKey = @"publicKey";
static NSString * const TelemetryEnabledKey = @"telemetryEnabled";
static NSString * const DataTransmissionEnabledKey = @"dataTransmissionEnabled";

+ (instancetype)current
{
    return _currentConfig;
}

+ (void)initialize
{
    if (self == [CodePushConfig class]) {
        _currentConfig = [[CodePushConfig alloc] init];
    }
}

- (instancetype)init
{
    self = [super init];
    NSDictionary *infoDictionary = [[NSBundle mainBundle] infoDictionary];

    NSString *appVersion = [infoDictionary objectForKey:@"CFBundleShortVersionString"];
    NSString *buildVersion = [infoDictionary objectForKey:(NSString *)kCFBundleVersionKey];
    NSString *releaseChannelPublicId = [infoDictionary objectForKey:@"CodePushReleaseChannelPublicId"];
    NSString *serverURL = [infoDictionary objectForKey:@"CodePushServerURL"];
    if (!serverURL) {
        serverURL = [infoDictionary objectForKey:@"CodePushServerUrl"];
    }

    NSString *publicKey = [infoDictionary objectForKey:@"CodePushSigningPublicKey"];

    NSUserDefaults *userDefaults = [NSUserDefaults standardUserDefaults];
    NSString *clientUniqueId = [userDefaults stringForKey:ClientUniqueIDConfigKey];
    if (clientUniqueId == nil) {
        clientUniqueId = [[[UIDevice currentDevice] identifierForVendor] UUIDString];
        [userDefaults setObject:clientUniqueId forKey:ClientUniqueIDConfigKey];
        [userDefaults synchronize];
    }

    NSNumber *defaultTelemetryEnabled = [infoDictionary objectForKey:@"CodePushDefaultTelemetryEnabled"];
    BOOL telemetryEnabled;
    if ([userDefaults objectForKey:TelemetryEnabledKey] != nil) {
        telemetryEnabled = [userDefaults boolForKey:TelemetryEnabledKey];
    } else if (defaultTelemetryEnabled != nil) {
        telemetryEnabled = [defaultTelemetryEnabled boolValue];
    } else {
        telemetryEnabled = YES;
    }

    NSNumber *defaultDataTransmissionEnabled = [infoDictionary objectForKey:@"CodePushDefaultDataTransmissionEnabled"];
    BOOL dataTransmissionEnabled;
    if ([userDefaults objectForKey:DataTransmissionEnabledKey] != nil) {
        dataTransmissionEnabled = [userDefaults boolForKey:DataTransmissionEnabledKey];
    } else if (defaultDataTransmissionEnabled != nil) {
        dataTransmissionEnabled = [defaultDataTransmissionEnabled boolValue];
    } else {
        dataTransmissionEnabled = YES;
    }

    if (!serverURL) {
        serverURL = @"https://codepush.appzung.com/";
    }

    _configDictionary = [NSMutableDictionary dictionary];

    if (appVersion) [_configDictionary setObject:appVersion forKey:AppVersionConfigKey];
    if (buildVersion) [_configDictionary setObject:buildVersion forKey:BuildVersionConfigKey];
    if (serverURL) [_configDictionary setObject:serverURL forKey:ServerURLConfigKey];
    if (clientUniqueId) [_configDictionary setObject:clientUniqueId forKey:ClientUniqueIDConfigKey];
    if (releaseChannelPublicId) [_configDictionary setObject:releaseChannelPublicId forKey:ReleaseChannelPublicIDConfigKey];
    if (publicKey) {
        CPLog(@"Executing CodePush with a signing public key.");
        [_configDictionary setObject:publicKey forKey:PublicKeyKey];
    }
    [_configDictionary setObject:@(telemetryEnabled) forKey:TelemetryEnabledKey];
    [_configDictionary setObject:@(dataTransmissionEnabled) forKey:DataTransmissionEnabledKey];

    return self;
}

- (NSString *)appVersion
{
    return [_configDictionary objectForKey:AppVersionConfigKey];
}

- (NSString *)buildVersion
{
    return [_configDictionary objectForKey:BuildVersionConfigKey];
}

- (NSDictionary *)configuration
{
    return _configDictionary;
}

- (NSString *)releaseChannelPublicId
{
    return [_configDictionary objectForKey:ReleaseChannelPublicIDConfigKey];
}

- (NSString *)serverURL
{
    return [_configDictionary objectForKey:ServerURLConfigKey];
}

- (NSString *)clientUniqueId
{
    return [_configDictionary objectForKey:ClientUniqueIDConfigKey];
}

- (NSString *)publicKey
{
    return [_configDictionary objectForKey:PublicKeyKey];
}

- (BOOL)telemetryEnabled
{
    return [[_configDictionary objectForKey:TelemetryEnabledKey] boolValue];
}

- (void)setTelemetryEnabled:(BOOL)telemetryEnabled
{
    [_configDictionary setValue:@(telemetryEnabled) forKey:TelemetryEnabledKey];
    NSUserDefaults *preferences = [NSUserDefaults standardUserDefaults];
    [preferences setBool:telemetryEnabled forKey:TelemetryEnabledKey];
    [preferences synchronize];
}

- (BOOL)dataTransmissionEnabled
{
    return [[_configDictionary objectForKey:DataTransmissionEnabledKey] boolValue];
}

- (void)setDataTransmissionEnabled:(BOOL)dataTransmissionEnabled
{
    [_configDictionary setValue:@(dataTransmissionEnabled) forKey:DataTransmissionEnabledKey];
    NSUserDefaults *preferences = [NSUserDefaults standardUserDefaults];
    [preferences setBool:dataTransmissionEnabled forKey:DataTransmissionEnabledKey];
    [preferences synchronize];
}

- (void)setAppVersion:(NSString *)appVersion
{
    [_configDictionary setValue:appVersion forKey:AppVersionConfigKey];
}

- (void)setReleaseChannelPublicId:(NSString *)releaseChannelPublicId
{
    [_configDictionary setValue:releaseChannelPublicId forKey:ReleaseChannelPublicIDConfigKey];
}

- (void)setServerURL:(NSString *)serverURL
{
    [_configDictionary setValue:serverURL forKey:ServerURLConfigKey];
}

//no setter for SigningPublicKey, because it's need to be hard coded within Info.plist for safety

@end
