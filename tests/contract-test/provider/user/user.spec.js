import { Verifier } from '@pact-foundation/pact';

describe('Pact verification user', () => {

    it ('Should validate the pact for user', () => {
        const brokerOpts = {
            provider: 'ebac-demo-store-server',
            providerBaseUrl: 'http://localhost:3000',
            pactUrls: 'http://localhost:9292/pacts/provider/UserProvider/consumer/UserConsumer/latest',
            publishVerificationResult: true,
            providerVersion: '1.0.0',
        }
        return new Verifier(brokerOpts).verifyProvider()
    })

});
