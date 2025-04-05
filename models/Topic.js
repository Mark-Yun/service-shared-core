import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    tags: [{
        type: String,
        trim: true,
    }],
    parentTopic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        default: null,
    },
    childTopics: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
    }],
}, {
    timestamps: true,
});

// 부모-자식 관계를 연결하는 pre-save hook 추가
topicSchema.pre('save', function (next) {
    if (this.parentTopic) {
        // 부모가 설정되면 부모의 childTopics 배열에 자식 추가
        mongoose.model('Topic').findByIdAndUpdate(
            this.parentTopic,
            { $push: { childTopics: this._id } },
            { new: true },
            next
        );
    } else {
        next();
    }
});

const Topic = mongoose.model('Topic', topicSchema);

export default Topic;
