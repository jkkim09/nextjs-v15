import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchWithInterceptor } from '../fetchWithInterceptor';

export const useExampleQuery = (id: string) => {
  return useQuery({
    queryKey: ['example', id],
    queryFn: () =>
      fetchWithInterceptor(`/api/example/${id}`, { method: 'GET' }),
  });
};

// POST 방식 예시
export const useExampleMutation = () => {
  return useMutation({
    mutationFn: (payload: { name: string }) =>
      fetchWithInterceptor('/api/example', {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
  });
};

// UPDATE(PUT) 방식 예시
export const useExampleUpdate = () => {
  return useMutation({
    mutationFn: (payload: { id: string; data: { name: string } }) =>
      fetchWithInterceptor(`/api/example/${payload.id}`, {
        method: 'PUT',
        body: JSON.stringify(payload.data),
      }),
  });
};

// DELETE 방식 예시
export const useExampleDelete = () => {
  return useMutation({
    mutationFn: (id: string) =>
      fetchWithInterceptor(`/api/example/${id}`, {
        method: 'DELETE',
      }),
  });
};
