import { Verifier } from '@pact-foundation/pact';

const brokerOpts = {
    provider: 'ebac-demo-store-server',
    providerBaseUrl: 'http://localhost:3000',
    pactUrls: 'http://localhost:9292/pacts/provider/UserProvider/consumer/UserConsumer/latest',
    publishVerificationResult: true,
    providerVersion: '1.0.0',
    consumerVersionTags: ['ebac'],
}

const verifier = new Verifier(brokerOpts);

describe('Pact verification user', () => {

    it ('Should validate the pact for user', async () => {
        const output = await verifier
            .verifyProvider();
        console.log('Pact Verification Complete!');
        console.log('Result:', output);
        app.close();
    })
});