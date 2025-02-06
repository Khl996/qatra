import type { AuthState } from './auth';
import type { PointsState } from './points';
import type { OffersState } from './offers';
import type { UIState } from './ui';

export interface RootState {
    auth: AuthState;
    points: PointsState;
    offers: OffersState;
    ui: UIState;
}
