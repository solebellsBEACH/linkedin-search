import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { DeveloperFormValues } from '../../shared/types/developer';
import { onSubmit, seniorityMap } from '../../shared/utils/query';
import { 
  Button, 
  Stack, 
  Autocomplete, 
  TextField, 
  Divider,
  Box,
  CircularProgress
} from '@mui/material';
import { personalQuery } from '../../shared/personalQuery';

const Select = lazy(() => import('../select').then(mod => ({ default: mod.Select })));
const Input = lazy(() => import('../input').then(mod => ({ default: mod.Input })));

const techSuggestions = ['React', 'Angular', 'Vue', 'QA', 'Frontend', 'Node.js'];
const tabOptions = [
  { label: 'Vagas', value: 'jobs' },
  { label: 'Publicações', value: 'content' }
];
const seniorityOptions = [
  { label: 'Estágio', value: 'Estágio' },
  { label: 'Junior', value: 'Junior' },
  { label: 'Pleno', value: 'Pleno' },
  { label: 'Senior', value: 'Senior' }
];

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

  const values = watch();

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

  const isFormFilled = values.tab && values.tech?.trim() && values.skip !== undefined;

  function handleUseCurrentQuery() {
    personalQuery.getQueryParams().then(({ raw, formatted }) => {
      const { skip, start, pageNum } = raw;
      const keywords = raw.keywords || '';
      const experienceLabel = formatted['Experience Level'];
      const seniority = seniorityMap[experienceLabel || ''] || '';

      if (keywords) setValue('tech', keywords);
      if (values.tab === 'jobs' && seniority) setValue('seniority', seniority);

      const skipValue = parseInt(skip || start || pageNum || '0', 10);
      if (values.tab === 'jobs') setValue('skip', isNaN(skipValue) ? 0 : skipValue);
    });
  }

  function handleClear() {
    reset({
      tab: values.tab,
      tech: '',
      seniority: 'Junior',
      skip: 0,
      exclude: '',
    });
  }

  const autocompleteStyles = {
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: 'primary.main',
      }
    }
  };

  return (
    <Suspense fallback={
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <CircularProgress size={24} />
      </Box>
    }>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <Stack spacing={1.5} sx={{ width: '100%' }}>
          {isJobsTab && (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleUseCurrentQuery}
              size="small"
              fullWidth
              sx={{
                fontSize: '0.8rem',
                py: 1,
                mb: 0.5
              }}
            >
              Usar pesquisa atual
            </Button>
          )}

          <Controller
            name="tab"
            control={control}
            render={({ field }) => (
              <Autocomplete
                value={tabOptions.find(option => option.value === field.value) || null}
                onChange={(_, newValue) => field.onChange(newValue?.value || 'jobs')}
                options={tabOptions}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Buscar em"
                    size="small"
                  />
                )}
                disableClearable
                ListboxProps={{
                  style: { maxHeight: '200px' }
                }}
                sx={autocompleteStyles}
              />
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
                  <TextField 
                    {...params} 
                    label="Tecnologia"
                    placeholder="React, QA, Frontend..."
                    size="small"
                  />
                )}
                ListboxProps={{
                  style: { maxHeight: '200px' }
                }}
                sx={autocompleteStyles}
              />
            )}
          />

          <Controller
            name="exclude"
            control={control}
            render={({ field }) => (
              <Autocomplete
                freeSolo
                options={[]}
                inputValue={field.value ?? ''}
                onInputChange={(_, newValue) => field.onChange(newValue)}
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    label="Excluir palavras-chave"
                    placeholder="Ex: estágio, júnior"
                    size="small"
                  />
                )}
                ListboxProps={{
                  style: { maxHeight: '200px' }
                }}
                sx={autocompleteStyles}
              />
            )}
          />

          {values.tab === 'jobs' && (
            <>
              <Controller
                name="seniority"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    value={seniorityOptions.find(option => option.value === field.value) || null}
                    onChange={(_, newValue) => field.onChange(newValue?.value || 'Junior')}
                    options={seniorityOptions}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Senioridade"
                        size="small"
                      />
                    )}
                    disableClearable
                    ListboxProps={{
                      style: { maxHeight: '200px' }
                    }}
                    sx={autocompleteStyles}
                  />
                )}
              />

              <Controller
                name="skip"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Página"
                    placeholder="0"
                    type="number"
                    size="small"
                    fullWidth
                    {...field}
                    value={field.value ?? 0}
                    sx={autocompleteStyles}
                  />
                )}
              />
            </>
          )}

          {values.tab === 'content' && (
            <Divider sx={{ my: 0.5 }}>Publicações</Divider>
          )}

          <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
            <Button
              onClick={handleClear}
              variant="outlined"
              color="secondary"
              size="small"
              fullWidth
              sx={{ fontSize: '0.8rem', py: 1 }}
            >
              Limpar
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              fullWidth
              sx={{ fontSize: '0.8rem', py: 1 }}
              disabled={!isFormFilled}
            >
              Buscar
            </Button>
          </Stack>
        </Stack>
      </form>
    </Suspense>
  );
}
