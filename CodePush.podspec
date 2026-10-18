require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name           = 'CodePush'
  s.version        = package['version'].gsub(/v|-beta/, '')
  s.summary        = package['description']
  s.author         = package['author']
  s.license        = package['license']
  s.homepage       = package['homepage']
  s.source         = { :git => 'https://github.com/appzung/react-native-code-push.git', :tag => "v#{s.version}"}
  s.ios.deployment_target = '15.1'
  s.tvos.deployment_target = '15.1'
  s.preserve_paths = '*.js'
  s.library        = 'z'
  s.source_files = 'ios/CodePush/*.{h,m,mm}', 'ios/CodePushSignatureVerification/*.swift'
  s.swift_version = '5.0'
  s.public_header_files = ['ios/CodePush/CodePush.h']
  s.pod_target_xcconfig = { "DEFINES_MODULE" => "YES" }

  install_modules_dependencies(s)

  s.dependency 'SSZipArchive', '~> 2.5.5'
  s.dependency 'JOSESwift', '~> 3.0'
end
