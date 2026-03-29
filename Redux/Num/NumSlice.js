"use client"
import { createSlice } from '@reduxjs/toolkit'

// 1 day expiry in milliseconds
const EXPIRY_TIME = 24 * 60 * 60 * 1000; // 1 day

const loadCart = () => {
    try {
        const raw = localStorage.getItem('RoomNo');
        if (!raw) return null;

        const data = JSON.parse(raw);

        if (Date.now() > data.expiry) {
            localStorage.removeItem('RoomNo');
            return null;
        }

        return data.value ?? null;

    } catch {
        return null;
    }
};

const saveCart = (value) => {
    const data = {
        value: value,
        expiry: Date.now() + EXPIRY_TIME,
    };
    localStorage.setItem('RoomNo', JSON.stringify(data));
};

const initialState = {
    item: loadCart(),
};

export const NumSlice = createSlice({
    name: 'RoomNo',
    initialState,
    reducers: {
        addRoomNO: (state, action) => {
            const room = action.payload;

            // store single number, not array
            state.item = room;

            saveCart(room);
        },
    },
});

export const { addRoomNO } = NumSlice.actions;
export default NumSlice.reducer;
