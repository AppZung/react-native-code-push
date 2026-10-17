// swift-tools-version: 6.0
import PackageDescription

let package = Package(
    name: "CodePush",
    platforms: [.iOS("15.5")],
    products: [
        .library(name: "CodePush", targets: ["CodePush"]),
    ],
    dependencies: [
        .package(name: "ReactNative", path: "../../../../xcframeworks"),
        .package(name: "React-GeneratedCode", path: "../../../ios"),
        .package(url: "https://github.com/ZipArchive/ZipArchive.git", "2.5.5"..<"2.6.0"),
        .package(url: "https://github.com/yourkarma/JWT.git", revision: "8414cafd06843addf1ce9a63417386f25b2a6e20"),
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
                .product(name: "JWT", package: "JWT"),
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
    ],
    cxxLanguageStandard: .cxx20
)
