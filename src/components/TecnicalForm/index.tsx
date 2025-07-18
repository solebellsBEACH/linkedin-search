import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { DeveloperFormValues } from '../../shared/types/developer';
import { onSubmit, seniorityMap } from '../../shared/utils/query';
import { Button, Stack, Autocomplete, TextField } from '@mui/material';
import { personalQuery } from '../../shared/personalQuery';

const Select = lazy(() => import('../select').then(mod => ({ default: mod.Select })));
const Input = lazy(() => import('../input').then(mod => ({ default: mod.Input })));

const techSuggestions = ['React', 'Angular', 'Vue', 'QA', 'Frontend', 'Node.js'];

export function TecnicalForm() {
  const [isJobsTab, setIsJobsTab] = useState<boolean | null>(null);

  const { handleSubmit, control, watch, setValue, reset } = useForm<DeveloperFormValues>({
    defaultValues: {
      tab: 'jobs',
      tech: '',
      seniority: 'Junior',
      skip: 0,
      exclude: '',
    },
  });

  useEffect(() => {
    personalQuery.isOnLinkedInJobsTab().then(setIsJobsTab);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'Enter') {
        handleSubmit(onSubmit)();
      }
      if (e.ctrlKey && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        handleClear();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSubmit]);

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

  function handleClear() {
    reset({
      tab: 'jobs',
      tech: '',
      seniority: 'Junior',
      skip: 0,
      exclude: '',
    });
  }

  return (
    <Suspense fallback={<div>Carregando formulário...</div>}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          {isJobsTab && (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleUseCurrentQuery}
              sx={{ fontWeight: 600, borderRadius: 2, '&:hover': { bgcolor: 'secondary.dark' } }}
            >
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
              <Autocomplete
                freeSolo
                options={techSuggestions}
                inputValue={field.value ?? ''}
                onInputChange={(_, newValue) => field.onChange(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Tecnologia" placeholder="React, QA, Frontend..." />
                )}
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
            name="exclude"
            control={control}
            render={({ field }) => (
              <Input
                label="Excluir palavras-chave"
                placeholder="Ex: estágio, júnior"
                {...field}
                value={field.value ?? ''}
              />
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

          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Button
              onClick={handleClear}
              variant="outlined"
              color="secondary"
              sx={{
                flex: 1,
                fontWeight: 500,
                '&:hover': { bgcolor: 'secondary.light' },
              }}
            >
              Limpar Filtros
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                flex: 1,
                fontWeight: 600,
                borderRadius: 2,
                '&:hover': { bgcolor: 'primary.dark' },
              }}
              disabled={!isFormFilled}
            >
              Buscar no LinkedIn
            </Button>
          </Stack>
        </Stack>
      </form>
    </Suspense>
  );
}
