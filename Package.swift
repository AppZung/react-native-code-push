// swift-tools-version: 6.0
import PackageDescription

let package = Package(
    name: "AppZungReactNativeCodePush",
    platforms: [.iOS("15.5")],
    products: [
        .library(name: "AppZungReactNativeCodePush", targets: ["CodePush"]),
    ],
    dependencies: [
        .package(name: "ReactNative", path: "../../../../xcframeworks"),
        .package(name: "React-GeneratedCode", path: "../../../ios"),
        .package(url: "https://github.com/ZipArchive/ZipArchive.git", "2.5.5"..<"2.6.0"),
        .package(url: "https://github.com/airsidemobile/JOSESwift.git", from: "3.0.0"),
    ],
    targets: [
        .target(
            name: "CodePush",
            dependencies: [
                .product(name: "ReactHeaders", package: "ReactNative"),
                .product(name: "ReactNativeHeaders", package: "ReactNative"),
                .product(name: "ReactNativeDependenciesHeaders", package: "ReactNative"),
                .product(name: "ReactAppHeaders", package: "React-GeneratedCode"),
                .product(name: "ZipArchive", package: "ZipArchive"),
                "CodePushSignatureVerification",
            ],
            path: "ios/CodePush",
            publicHeadersPath: ".",
            cxxSettings: [
                .define("DEBUG", .when(configuration: .debug)),
                .define("NDEBUG", .when(configuration: .release)),
            ],
            linkerSettings: [
                .linkedLibrary("z"),
            ]
        ),
        .target(
            name: "CodePushSignatureVerification",
            dependencies: [
                .product(name: "JOSESwift", package: "JOSESwift"),
            ],
            path: "ios/CodePushSignatureVerification"
        ),
    ],
    cxxLanguageStandard: .cxx20
)
