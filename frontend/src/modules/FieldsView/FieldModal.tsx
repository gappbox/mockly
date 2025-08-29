import NiceModal, { useModal } from '@ebay/nice-modal-react';
import Button from 'rsuite/Button';
import Card from 'rsuite/Card';
import CardBody from 'rsuite/CardBody';
import Form from 'rsuite/Form';
import FormControlLabel from 'rsuite/FormControlLabel';
import FormGroup from 'rsuite/FormGroup';
import HStack from 'rsuite/HStack';
import IconButton from 'rsuite/IconButton';
import Input from 'rsuite/Input';
import InputPicker from 'rsuite/InputPicker';
import Modal from 'rsuite/Modal';
import ModalBody from 'rsuite/ModalBody';
import ModalFooter from 'rsuite/ModalFooter';
import ModalHeader from 'rsuite/ModalHeader';
import ModalTitle from 'rsuite/ModalTitle';
import ReloadIcon from '@rsuite/icons/Reload';
import Text from 'rsuite/Text';
import VStack from 'rsuite/VStack';
import ErrorMessage from '../../components/ErrorMessage';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useEntities } from '../../data/hooks';
import { Field } from '../../data/models';

const FieldModal = NiceModal.create(({ field }: { field: Field | null }) => {
  const defaultValues: Field = field ?? {
    id: window.crypto.randomUUID(),
    type: '',
    field: '',
    category: '',
  };
  const {
    control,
    watch,
    getValues,
    setValue,
    handleSubmit,
  } = useForm({ defaultValues });
  const {
    appendField,
    categories,
    example,
    generateMockData,
    generating,
    loadCategories,
    loadingCategories,
    loadingTypes,
    loadTypeForCategory,
    setExample,
    types,
    updateField,
  } = useEntities();
  const [selectedCategory, setSelectedCategory] = useState(defaultValues?.category ?? '');
  const modal = useModal();

  useEffect(() => {
    if (defaultValues.category) {
      loadTypeForCategory(defaultValues.category);
    }

    if (defaultValues.category && defaultValues.type) {
      generateMockData(defaultValues.category, defaultValues.type);
    }

    loadCategories();
  }, []);

  return (
    <Modal
      backdrop="static"
      size="sm"
      open={modal.visible}
      onClose={modal.hide}
      onExited={modal.remove}
    >
      <Form fluid onSubmit={(handleSubmit as any)((values: Field) => {
        if (field)  updateField(values);
        if (!field) appendField(values);
        modal.hide();
      })}>
        <ModalHeader>
          <ModalTitle>{field ? 'Edit' : 'Add'} field</ModalTitle>
        </ModalHeader>

        <ModalBody>
          <Text muted style={{ marginBottom: 20 }}>Specify the name, category and type for the field. This information will be used to generate and categorize data accurately.</Text>

          <FormGroup style={{ width: '100%' }}>
            <FormControlLabel>
              <Text muted>Name</Text>
            </FormControlLabel>

            <Controller
              control={control}
              name="field"
              rules={{
                required: 'Name is required',
                validate: (value) => {
                  return /^[a-zA-Z0-9\-_]+$/.test(value) || 'Letters, numbers, hyphens and underscores are allowed';
                },
              }}
              render={({ field, fieldState }) => (
                <ErrorMessage message={fieldState.error?.message}>
                  <Input
                    autoFocus
                    id={field.name}
                    placeholder="Enter field name"
                    value={field.value}
                    type="text"
                    onChange={(value) => field.onChange(value)}
                  />
                </ErrorMessage>
              )}
            />
          </FormGroup>

          <HStack alignItems="stretch" spacing={16} style={{ width: '100%' }}>
            <FormGroup style={{ width: '50%' }}>
              <FormControlLabel>
                <Text muted>Category</Text>
              </FormControlLabel>

              <Controller
                control={control}
                name="category"
                rules={{required: 'Category is required'}}
                render={({ field, fieldState }) => (
                  <ErrorMessage message={fieldState.error?.message}>
                    <InputPicker
                      block
                      cleanable={false}
                      data={categories}
                      labelKey="name"
                      loading={loadingCategories}
                      menuMaxHeight={140}
                      placeholder="Select category"
                      value={field.value}
                      valueKey="code"
                      onKeyDown={(event) => event.key === 'Enter' ? event.preventDefault() : ''}
                      onChange={(value: string) => {
                        field.onChange(value);
                        setValue('type', '');
                        setSelectedCategory(value);
                        setExample('n/a');
                        loadTypeForCategory(value);
                      }}
                    />
                  </ErrorMessage>
                )}
              />
            </FormGroup>

            <FormGroup style={{ width: '50%' }}>
              <FormControlLabel>
                <Text muted>Type</Text>
              </FormControlLabel>

              <Controller
                control={control}
                name="type"
                rules={{required: 'Type is required'}}
                render={({ field, fieldState }) => (
                  <ErrorMessage message={fieldState.error?.message}>
                    <InputPicker
                      block
                      cleanable={false}
                      data={types[selectedCategory] ?? []}
                      labelKey="name"
                      loading={!!(selectedCategory && loadingTypes)}
                      menuMaxHeight={140}
                      placeholder="Select type"
                      value={field.value}
                      valueKey="code"
                      onKeyDown={(event) => event.key === 'Enter' ? event.preventDefault() : ''}
                      onChange={async (value: string) => {
                        field.onChange(value);
                        await generateMockData(selectedCategory, value);
                      }}
                    />
                  </ErrorMessage>
                )}
              />
            </FormGroup>
          </HStack>

          <VStack spacing={8}>
            <HStack
              alignItems="flex-end"
              justifyContent="space-between"
              spacing={8}
              style={{ width: '100%' }}
            >
              <Text muted>Example:</Text>
              <IconButton
                appearance="subtle"
                disabled={!(watch('category') && watch('type'))}
                icon={<ReloadIcon />}
                loading={generating}
                onClick={() => generateMockData(getValues().category, getValues().type)}
              />
            </HStack>

            <Card size="sm">
              <CardBody>{JSON.stringify(example)}</CardBody>
            </Card>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button appearance="subtle" onClick={modal.hide}>
            Cancel
          </Button>
          <Button appearance="primary" type="submit">
            Save changes
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
});

export default FieldModal;