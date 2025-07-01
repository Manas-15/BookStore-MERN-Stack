import { Button } from '@/components/ui/button';

type FormFooterProps = {
  form: {
    reset: () => void;
  };
  selectedItem: any | null;
  setSelectedItem: (item: any | null) => void;
  setOpen: (isOpen: boolean) => void;
};

const FormFooter = ({
  form,
  selectedItem,
  setSelectedItem,
  setOpen
}: FormFooterProps) => {
  return (
    <div className='mt-3 flex justify-end space-x-2'>
      <Button
        variant='secondary'
        type='button'
        onClick={() => {
          form.reset();
          setSelectedItem(null);
          setOpen(false);
        }}
      >
        Cancel
      </Button>
      <Button type='submit'>
        {selectedItem != null ? 'Update' : 'Submit'}
      </Button>
    </div>
  );
};

export default FormFooter;
