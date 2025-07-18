import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { DeveloperFormValues } from '../../shared/types/developer';
import { onSubmit, seniorityMap } from '../../shared/utils/query';
import { Button, Stack } from '@mui/material';
import { personalQuery } from '../../shared/personalQuery';

const Select = lazy(() => import('../select').then(mod => ({ default: mod.Select })));
const Input = lazy(() => import('../input').then(mod => ({ default: mod.Input })));

export function TecnicalForm() {
  const [isJobsTab, setIsJobsTab] = useState<boolean | null>(null);

  const { handleSubmit, control, watch, setValue } = useForm<DeveloperFormValues>({
    defaultValues: {
      tab: 'jobs',
      tech: '',
      seniority: 'Junior',
      skip: 0,
    },
  });

  useEffect(() => {
    personalQuery.isOnLinkedInJobsTab().then(setIsJobsTab);
  }, []);

  const values = watch();

  const isFormFilled =
    values.tab && values.tech?.trim() && values.seniority && values.skip !== undefined;

  function handleUseCurrentQuery() {
    personalQuery.getQueryParams().then(({ raw, formatted }) => {
      const { skip, start, pageNum } = raw;
      const keywords = raw.keywords || '';
      const experienceLabel = formatted['Experience Level'];
      const seniority = seniorityMap[experienceLabel || ''] || '';

      if (keywords) setValue('tech', keywords);
      if (seniority) setValue('seniority', seniority);

      const skipValue = parseInt(skip || start || pageNum || '0', 10);
      setValue('skip', isNaN(skipValue) ? 0 : skipValue);
    });
  }

  return (
    <Suspense fallback={<div>Carregando formulário...</div>}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          {isJobsTab && (
            <Button variant="contained" color="secondary" onClick={handleUseCurrentQuery}>
              Usar pesquisa atual
            </Button>
          )}

          <Controller
            name="tab"
            control={control}
            render={({ field }) => (
              <Select label="Aba:" {...field} value={field.value ?? 'jobs'}>
                <option value="jobs">Vagas</option>
                <option value="content">Publicações</option>
              </Select>
            )}
          />

          <Controller
            name="tech"
            control={control}
            render={({ field }) => (
              <Input
                label="Tecnologia:"
                placeholder="React, QA, Frontend..."
                {...field}
                value={field.value ?? ''}
              />
            )}
          />

          <Controller
            name="seniority"
            control={control}
            render={({ field }) => (
              <Select label="Senioridade:" {...field} value={field.value ?? 'Junior'}>
                <option value="Estágio">Estágio</option>
                <option value="Junior">Junior</option>
                <option value="Pleno">Pleno</option>
                <option value="Senior">Senior</option>
              </Select>
            )}
          />

          <Controller
            name="skip"
            control={control}
            render={({ field }) => (
              <Input
                label="Página de Pesquisa"
                placeholder="0"
                type="number"
                {...field}
                value={field.value ?? 0}
              />
            )}
          />

          <Button
            type="submit"
            style={{ marginBottom: 10 }}
            variant="contained"
            color="primary"
            disabled={!isFormFilled}
          >
            Buscar no LinkedIn
          </Button>
        </Stack>
      </form>
    </Suspense>
  );
}
