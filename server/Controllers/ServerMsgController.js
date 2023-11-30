import serverMessageModel from "../Models/serverMessage.js";
import mongoose from 'mongoose';

export const getServerMessage = async (req, res) => {
    // Check if the request has an 'Origin' header
    const url = req.get('Origin');
    console.log('Domain:', url);

    if (process.env.NODE_ENV === 'production' && url !== process.env.CLIENT_URL) {
        res.status(403).json({ message: `${process.env.ACCESS_FORBIDDEN_MSG}`, url: url });
        return;
    }

    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ObjectId' });
        }

        const serverMessage = await serverMessageModel.findById(id);

        if (!serverMessage) {
            return res.status(404).json({ error: 'Message not found' });
        }
        const serverDetails = serverMessage._doc;
        delete serverDetails.privateInfo;
        delete serverDetails.__v;
        delete serverDetails._id;
        delete serverDetails.userId;
        delete serverDetails.createdAt;
        delete serverDetails.updatedAt;

        if (!serverDetails.visibility) {
            return res.status(200).json();
        }
        delete serverDetails.visibility;

        res.status(200).json(serverDetails);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const createServerMessage = async (req, res) => {
    const { userId, visibility, title, severity, desc, privateInfo } = req.body;
    // Check if the request has an 'Origin' header
    const url = req.get('Origin');
    console.log('Domain:', url);
    if (process.env.NODE_ENV === "production" && url !== process.env.CLIENT_URL) {
        res.status(403).json({ message: `${process.env.ACCESS_FORBIDDEN_MSG}`, url: url });
        return;
    }
    try {
        const newServerMessage = new serverMessageModel({
            userId,
            visibility,
            title,
            severity,
            desc,
            privateInfo,
        });

        const savedMessage = await newServerMessage.save();
        res.status(201).json(savedMessage);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateServerMessage = async (req, res) => {
    const messageId = req.params.id;
    const { userId, visibility, title, severity, desc, privateInfo } = req.body;
    // Check if the request has an 'Origin' header
    const url = req.get('Origin');
    console.log('Domain:', url);
    if (process.env.NODE_ENV === "production" && url !== process.env.CLIENT_URL) {
        res.status(403).json({ message: `${process.env.ACCESS_FORBIDDEN_MSG}`, url: url });
        return;
    }
    try {
        const updatedMessage = await serverMessageModel.findByIdAndUpdate(
            messageId,
            {
                userId,
                visibility,
                title,
                severity,
                desc,
                privateInfo,
            },
            { new: true }
        );

        if (!updatedMessage) {
            return res.status(404).json({ error: 'Message not found' });
        }

        res.status(200).json(updatedMessage);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteServerMessage = async (req, res) => {
    const messageId = req.params.id;
    // Check if the request has an 'Origin' header
    const url = req.get('Origin');
    console.log('Domain:', url);
    if (process.env.NODE_ENV === "production" && url !== process.env.CLIENT_URL) {
        res.status(403).json({ message: `${process.env.ACCESS_FORBIDDEN_MSG}`, url: url });
        return;
    }
    try {
        const deletedMessage = await serverMessageModel.findByIdAndDelete(messageId);

        if (!deletedMessage) {
            return res.status(404).json({ error: 'Message not found' });
        }

        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
