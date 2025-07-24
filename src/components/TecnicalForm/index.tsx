import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { DeveloperFormValues } from '../../shared/types/developer';
import { onSubmit, seniorityMap } from '../../shared/utils/query';
import { 
  Button, 
  Stack, 
  Autocomplete, 
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Box,
  CircularProgress,
  Tooltip
} from '@mui/material';
import { personalQuery } from '../../shared/personalQuery';

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

interface Option {
  label: string;
  value: string;
}

const KEYBOARD_SHORTCUTS = {
  submit: '⌃ Enter',
  clear: '⌃ L',
  nextField: 'Tab',
  previousField: '⇧ Tab',
  useCurrentQuery: '⌃ U',
  focusTech: '⌃ T',
  focusSeniority: '⌃ S',
  focusPage: '⌃ P'
} as const;

export function TecnicalForm() {
  const [isJobsTab, setIsJobsTab] = useState<boolean | undefined>(undefined);
  const techRef = React.useRef<HTMLInputElement>(null);
  const seniorityRef = React.useRef<HTMLInputElement>(null);
  const pageRef = React.useRef<HTMLInputElement>(null);

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
      // Ignora atalhos quando estiver em campos de input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        if (e.ctrlKey && e.key === 'Enter') {
          handleSubmit(onSubmit)();
        }
        return;
      }

      if (e.ctrlKey) {
        switch (e.key.toLowerCase()) {
          case 'enter':
            e.preventDefault();
            handleSubmit(onSubmit)();
            break;
          case 'l':
            e.preventDefault();
            handleClear();
            break;
          case 'u':
            e.preventDefault();
            if (isJobsTab) handleUseCurrentQuery();
            break;
          case 't':
            e.preventDefault();
            techRef.current?.focus();
            break;
          case 's':
            e.preventDefault();
            seniorityRef.current?.focus();
            break;
          case 'p':
            e.preventDefault();
            pageRef.current?.focus();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSubmit, isJobsTab]);

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
    techRef.current?.focus();
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
            <Tooltip title={`Atalho: ${KEYBOARD_SHORTCUTS.useCurrentQuery}`} placement="top">
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
            </Tooltip>
          )}

          <Controller
            name="tab"
            control={control}
            render={({ field }) => (
              <Autocomplete<Option>
                value={tabOptions.find(option => option.value === field.value) || undefined}
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
              <Tooltip title={`Foco: ${KEYBOARD_SHORTCUTS.focusTech}`} placement="top">
                <Autocomplete
                  freeSolo
                  options={techSuggestions}
                  inputValue={field.value ?? ''}
                  onInputChange={(_, newValue) => field.onChange(newValue)}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      inputRef={techRef}
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
              </Tooltip>
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
                  <Tooltip title={`Foco: ${KEYBOARD_SHORTCUTS.focusSeniority}`} placement="top">
                    <FormControl fullWidth size="small">
                      <InputLabel>Senioridade</InputLabel>
                      <Select
                        {...field}
                        label="Senioridade"
                        inputRef={seniorityRef}
                      >
                        {seniorityOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Tooltip>
                )}
              />

              <Controller
                name="skip"
                control={control}
                render={({ field }) => (
                  <Tooltip title={`Foco: ${KEYBOARD_SHORTCUTS.focusPage}`} placement="top">
                    <TextField
                      label="Página"
                      placeholder="0"
                      type="number"
                      size="small"
                      fullWidth
                      inputRef={pageRef}
                      {...field}
                      value={field.value ?? 0}
                      sx={autocompleteStyles}
                    />
                  </Tooltip>
                )}
              />
            </>
          )}

          {values.tab === 'content' && (
            <Divider sx={{ my: 0.5 }}>Publicações</Divider>
          )}

          <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
            <Tooltip title={`Atalho: ${KEYBOARD_SHORTCUTS.clear}`} placement="top">
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
            </Tooltip>
            <Tooltip title={`Atalho: ${KEYBOARD_SHORTCUTS.submit}`} placement="top">
              <span style={{ width: '100%' }}>
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
              </span>
            </Tooltip>
          </Stack>
        </Stack>
      </form>
    </Suspense>
  );
}
