import { jest } from '@jest/globals';
import { resolvers } from './topic.resolver.js';
import * as TopicModule from '../../../models/Topic.js'; // 바꿔야 함

const mockConstructor = jest.fn();

jest.mock('../../../models/Topic.js', () => ({
    __esModule: true,
    default: Object.assign(jest.fn(), {
        findById: jest.fn(),
        find: jest.fn(),
        findByIdAndDelete: jest.fn(),
    }),
}));

describe('Topic Resolvers', () => {
    describe('Query.getTopicById', () => {
        it('should return a topic by ID', async () => {
            const mockTopic = { _id: '1', name: 'Test Topic' };
            TopicModule.default.findById.mockResolvedValue(mockTopic);

            const result = await resolvers.Query.getTopicById(null, { id: '1' });

            expect(TopicModule.default.findById).toHaveBeenCalledWith('1');
            expect(result).toEqual(mockTopic);
        });
    });

    describe('Query.getTopicsByParent', () => {
        it('should return topics by parent ID', async () => {
            const mockTopics = [
                { _id: '1', name: 'Child Topic 1' },
                { _id: '2', name: 'Child Topic 2' },
            ];
            TopicModule.default.find.mockResolvedValue(mockTopics);

            const result = await resolvers.Query.getTopicsByParent(null, { parentId: '123' });

            expect(TopicModule.default.find).toHaveBeenCalledWith({ parentTopic: '123' });
            expect(result).toEqual(mockTopics);
        });
    });

    describe('Mutation.createTopic', () => {
        it('should create a new topic', async () => {
            const mockSave = jest.fn();
            const mockTopicInstance = {
                _id: '1',
                name: 'New Topic',
                description: 'Description',
                parentTopicId: null,
                tags: ['tag1'],
                save: mockSave,
            };

            TopicModule.default.mockImplementation(() => mockTopicInstance);
            mockSave.mockResolvedValue(mockTopicInstance);

            const result = await resolvers.Mutation.createTopic(null, {
                name: 'New Topic',
                description: 'Description',
                parentTopicId: null,
                tags: ['tag1'],
            });

            expect(result).toEqual(mockTopicInstance);
        });
    });

    describe('Mutation.deleteTopic', () => {
        it('should delete a topic by ID', async () => {
            TopicModule.default.findByIdAndDelete.mockResolvedValue(true);

            const result = await resolvers.Mutation.deleteTopic(null, { id: '1' });

            expect(TopicModule.default.findByIdAndDelete).toHaveBeenCalledWith('1');
            expect(result).toBe(true);
        });
    });
});
