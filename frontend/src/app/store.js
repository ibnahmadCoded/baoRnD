import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import projectReducer from '../features/projects/projectSlice';
import feedbackReducer from '../features/feedbacks/feedbackSlice';
import notificationReducer from "../features/notifications/notificationSlice";
import userReducer from "../features/users/userSlice";
import oneprojectReducer from "../features/project/projectSlice"
import stakeholderReducer from "../features/stakeholders/stakeholderSlice"
import materialReducer from "../features/materials/materialSlice"
import contactReducer from "../features/contacts/contactSlice"
import milestoneReducer from "../features/milestones/milestoneSlice"
import updateReducer from "../features/updates/updateSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    feedbacks: feedbackReducer,
    notifications: notificationReducer,
    users: userReducer,
    project: oneprojectReducer,
    stakeholders: stakeholderReducer,
    materials: materialReducer,
    contacts: contactReducer,
    milestones: milestoneReducer,
    updates: updateReducer,
  },
});
