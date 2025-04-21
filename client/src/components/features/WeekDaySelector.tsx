import classNames from "classnames";
import { FieldError } from 'react-hook-form';

const DAYS_DATA = [
    { digit: '1', short: 'M', full: 'Monday' },
    { digit: '2', short: 'T', full: 'Tuesday' },
    { digit: '3', short: 'W', full: 'Wednesday' },
    { digit: '4', short: 'T', full: 'Thursday' },
    { digit: '5', short: 'F', full: 'Friday' },
    { digit: '6', short: 'S', full: 'Saturday' },
    { digit: '7', short: 'S', full: 'Sunday' },
];

interface DaySelectorCirclesProps {
    field: {
        onChange: (value: string | undefined) => void; 
        onBlur: () => void; 
        value: string | undefined | null; 
        name: string; 
        ref: React.Ref<any>; 
    };
    
    fieldState: {
        invalid: boolean; 
        isDirty: boolean; 
        isTouched: boolean; 
        error?: FieldError; 
    };
    label?: string;
    disabled?: boolean;
}

const DaySelectorCircles: React.FC<DaySelectorCirclesProps> = (props) => {

    const { field, fieldState, label, disabled } = props;
    
    const valueAsString = typeof field.value === 'string' ? field.value : '';
    const selectedDayDigits = valueAsString.split('').filter(digit => DAYS_DATA.some(day => day.digit === digit));
    const errorMessage = fieldState.error?.message;

    const handleDayClick = (clickedDigit: string) => {
        if (disabled) return;

        const isCurrentlySelected = selectedDayDigits.includes(clickedDigit);

        let newSelectedDayDigits: string[];

        if (isCurrentlySelected) {
            newSelectedDayDigits = selectedDayDigits.filter(digit => digit !== clickedDigit);
        } else {
            newSelectedDayDigits = [...selectedDayDigits, clickedDigit];
        }

        const outputString = newSelectedDayDigits
            .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
            .join('');

        field.onChange(outputString);
    };

    return (
        <div className="" onBlur={field.onBlur}>
            {label && (
                <label className="block text-sm font-medium mb-1">
                    {label}
                </label>
            )}
            <div className="flex flex-wrap justify-center gap-2">
                {DAYS_DATA.map((day) => {
                    const isSelected = selectedDayDigits.includes(day.digit);

                    return (
                        <button
                            key={day.digit} 
                            type="button"
                            className={classNames(
                                'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium',
                                'transition-colors duration-200 ease-in-out', 
                                'border',
                                disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
                                {
                                    'bg-blue-600 text-white border-blue-600': isSelected,
                                    'bg-transparent text-gray-400 border-gray-400 hover:bg-gray-200': !isSelected && !disabled,
                                }
                            )}
                            onClick={() => handleDayClick(day.digit)} 
                            disabled={disabled}
                            aria-pressed={isSelected}
                            aria-label={day.full}
                            title={day.full}
                        >
                            {day.short}
                        </button>
                    );
                })}
            </div>
            {errorMessage && (
                <p className="text-sm text-red-700 bg-red-100 p-2 rounded-md mt-1 w-full">
                     {errorMessage}
                 </p>
            )}
        </div>
    );
};

export default DaySelectorCircles;