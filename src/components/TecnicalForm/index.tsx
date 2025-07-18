import React, { useEffect, useState } from 'react'; 
import { useForm, Controller } from 'react-hook-form';
import { DeveloperFormValues } from '../../shared/types/developer';
import { onSubmit, seniorityMap } from '../../shared/utils/query';
import { Button, Stack } from '@mui/material';
import { Select } from '../select';
import { Input } from '../input';
import { personalQuery } from '../../shared/personalQuery';

export function TecnicalForm() {
  const [isJobsTab, setIsJobsTab] = useState<boolean | null>(null);

  const { handleSubmit, control, watch, setValue } = useForm<DeveloperFormValues>({
    defaultValues: {
      tab: 'jobs',
      skip: 0,
      seniority: 'Estágio',
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
    console.log(raw)
    const {skip, start , pageNum,} = raw
    // skip || start || pageNum

    const keywords = raw.keywords || '';
    const seniority = seniorityMap[raw['f_E']];

    console.log(seniority)

    if (keywords) setValue('tech', keywords);
    if (seniority) setValue('seniority', seniority);
    setValue('skip', parseInt(skip || start || pageNum || "0"));
  });
}

  return (
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
        <Select label="Aba:" {...field}>
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
        />
      )}
    />

    <Controller
      name="seniority"
      control={control}
      render={({ field }) => (
        <Select label="Senioridade:" {...field}>
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

  );
}
