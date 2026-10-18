import Foundation
import JOSESwift
import Security

@objc(CodePushSignatureVerifier)
public final class CodePushSignatureVerifier: NSObject {
    @objc(verifiedPayloadOfJWT:publicKey:error:)
    public static func verifiedPayload(ofJWT jwt: String, publicKey: String) throws -> [String: Any] {
        let key = try rsaPublicKey(fromBase64DER: publicKey)
        guard let verifier = Verifier(signatureAlgorithm: .RS256, key: key) else {
            throw verificationError("Cannot create an RS256 verifier for the public key")
        }

        let jws: JWS
        do {
            jws = try JWS(compactSerialization: jwt).validate(using: verifier)
        } catch {
            throw verificationError("Invalid JWT signature: \(error)")
        }

        guard let payload = try? JSONSerialization.jsonObject(with: jws.payload.data()) as? [String: Any] else {
            throw verificationError("The JWT payload is not a JSON object")
        }
        return payload
    }

    static func rsaPublicKey(fromBase64DER base64: String) throws -> SecKey {
        guard let der = Data(base64Encoded: base64) else {
            throw verificationError("The public key is not valid base64")
        }
        let attributes = [
            kSecAttrKeyType: kSecAttrKeyTypeRSA,
            kSecAttrKeyClass: kSecAttrKeyClassPublic,
        ] as CFDictionary

        var error: Unmanaged<CFError>?
        guard let key = SecKeyCreateWithData(der as CFData, attributes, &error) else {
            let reason = error.map { "\($0.takeRetainedValue())" } ?? "unknown error"
            throw verificationError("Cannot read the public key: \(reason)")
        }
        return key
    }

    private static func verificationError(_ message: String) -> NSError {
        NSError(domain: "CodePushSignatureVerifier", code: -1, userInfo: [NSLocalizedDescriptionKey: message])
    }
}
