import { useEffect, useMemo, useState } from 'react';
import { useMonaco } from '@monaco-editor/react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';

type Props = {
  value?: string;
  onChange: (language: string) => void;
};

export const LanguageSelector = ({ value, onChange }: Props) => {
  const monaco = useMonaco();

  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');

  useEffect(() => {
    setSelectedLanguage(value || '');
  }, [value]);

  const allLanguages = useMemo(() => {
    return monaco?.languages.getLanguages() || [];
  }, [monaco]);

  const handleChange = (languageId: string) => {
    const newLanguage = languageId === selectedLanguage ? '' : languageId;
    setSelectedLanguage(newLanguage);
    onChange(newLanguage);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="min-w-[200px] w-full justify-between capitalize text-black bg-orange-600"
        >
          {selectedLanguage
            ? allLanguages.find((language) => language.id === selectedLanguage)?.id
            : 'Select language...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[200px] w-full p-0">
        <Command>
          <CommandInput placeholder="Search language..." />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {allLanguages.map((language) => (
                <CommandItem
                  className="capitalize"
                  key={language.id}
                  value={language.id}
                  onSelect={() => handleChange(language.id)}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selectedLanguage === language.id ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {language.id}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
