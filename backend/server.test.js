const request = require('supertest');
const app = require('./server'); // Adjust the path if necessary

describe('API Endpoints', () => {
    it('should respond with a success message on report submission', async () => {
        const response = await request(app)
            .post('/api/reports/submit')
            .send({
                location: 'Test Location',
                description: 'Test Description',
                resourcesNeeded: 'Food'
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Report submitted successfully!');
    });

    it('should respond with a success message on resource request', async () => {
        const response = await request(app)
            .post('/api/resources/request')
            .send({
                resourceType: 'Food',
                quantity: 10
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Resource request submitted successfully!');
    });

    it('should respond with a success message on photo upload', async () => {
        const response = await request(app)
            .post('/api/photos/upload')
            .attach('photo', 'path/to/test-image.jpg'); // Adjust path to an actual image

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Photo uploaded successfully!');
    });

    it('should respond with a message from the chatbot', async () => {
        const response = await request(app)
            .post('/api/chat')
            .send({ message: 'Help' });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('I can assist with disaster reports, resource requests, and more!');
    });
});
