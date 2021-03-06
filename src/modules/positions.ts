import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { rootApi } from 'utils/api';
import { AppThunk } from 'utils/store';
import { showAlert } from './alerts';
import { getAllOrders } from './orders';

export interface Position {
  _id: string;
  positionName: string;
  startTime: string;
  endTime: string;
  orders: string[];
  organization: string;
}

export interface PositionsState {
  positions: Position[] | null;
  loading: boolean;
}

const initialState: PositionsState = {
  positions: null,
  loading: true,
};

const positionsSlice = createSlice({
  name: 'positions',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      return {
        ...state,
        loading: payload,
      };
    },
    setPositions: (state, { payload }: PayloadAction<{ data: Position[] }>) => {
      return {
        ...state,
        positions: payload.data,
        loading: false,
      };
    },
    unsetPositions: (state) => {
      return {
        ...state,
        positions: null,
        loading: true,
      };
    },
    unsetSinglePosition: (state, { payload }: PayloadAction<string>) => {
      const { positions } = state;

      return {
        ...state,
        positions: (positions as Position[]).filter(
          ({ _id }) => _id !== payload
        ),
      };
    },
  },
});

export const {
  setLoading,
  setPositions,
  unsetPositions,
  unsetSinglePosition,
} = positionsSlice.actions;
export default positionsSlice.reducer;

export const positionsSelector = (state: { positions: PositionsState }) =>
  state.positions;

export const getAllPositions = (): AppThunk => async (dispatch) => {
  try {
    const res = await axios.get(`${rootApi}/api/v1/positions`);

    dispatch(setPositions(res.data));
  } catch (error) {
    dispatch(setLoading(false));
  }
};

export interface CreatePositionValues {
  positionName: string;
  startTime: string;
  endTime: string;
}

export const createPosition = (
  { positionName, startTime, endTime }: CreatePositionValues,
  closeModal: () => void
): AppThunk => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ positionName, startTime, endTime });

  try {
    await axios.post(`${rootApi}/api/v1/positions`, body, config);

    dispatch(setLoading(true));

    dispatch(getAllPositions());
    dispatch(
      showAlert({
        message: 'Position created',
        alertType: 'success',
      })
    );

    closeModal();
  } catch (error) {
    dispatch(
      showAlert({ message: error.response.data.error, alertType: 'error' })
    );
  }
};

export interface UpdatePositionValues extends CreatePositionValues {
  id: string;
}

export const updatePosition = (
  { id, positionName, startTime, endTime }: UpdatePositionValues,
  closeModal: () => void
): AppThunk => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ positionName, startTime, endTime });

  try {
    await axios.put(`${rootApi}/api/v1/positions/${id}`, body, config);

    dispatch(setLoading(true));

    dispatch(getAllPositions());
    dispatch(getAllOrders());
    dispatch(
      showAlert({
        message: 'Position updated',
        alertType: 'success',
      })
    );

    closeModal();
  } catch (error) {
    dispatch(
      showAlert({ message: error.response.data.error, alertType: 'error' })
    );
  }
};

export const deletePosition = (id: string): AppThunk => async (dispatch) => {
  try {
    await axios.delete(`${rootApi}/api/v1/positions/${id}`);

    dispatch(setLoading(true));

    dispatch(unsetSinglePosition(id));
    dispatch(getAllPositions());
    dispatch(getAllOrders());

    dispatch(
      showAlert({
        message: 'Position deleted',
        alertType: 'success',
      })
    );
  } catch (error) {
    dispatch(
      showAlert({ message: error.response.data.error, alertType: 'error' })
    );
  }
};
