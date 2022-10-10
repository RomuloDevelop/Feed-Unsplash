/* eslint-disable react-hooks/exhaustive-deps */
import {AsyncThunkAction} from '@reduxjs/toolkit';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Basic} from 'unsplash-js/dist/methods/photos/types';
import {AppDispatch} from '../store';

export const usePhotosPaginator = (
  fetchPhotosAction: (page: number) => AsyncThunkAction<Basic[], any, {}>,
) => {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(fetchPhotosAction(page));
  }, [page]);

  const addPage = useCallback(() => {
    if (page <= 10) {
      setPage(page + 1);
    }
  }, [page]);

  return addPage;
};
