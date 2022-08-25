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
import applicationReducer from "../features/applications/applicaitonSlice"
import investmentReducer from '../features/investments/investmentSlice';
import goalReducer from "../features/goals/goalSlice"
import deliverableReducer from "../features/deliverables/deliverableSlice"
import fieldReducer from "../features/fields/fieldSlice"
import tagReducer from "../features/tags/tagSlice"
import requestReducer from "../features/requests/requestSlice"
import referralReducer from '../features/referrals/referralSlice';

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
    applications: applicationReducer,
    investments: investmentReducer,
    goals: goalReducer,
    deliverables: deliverableReducer,
    fields: fieldReducer,
    tags: tagReducer,
    requests: requestReducer,
    referrals: referralReducer,
  },
});
