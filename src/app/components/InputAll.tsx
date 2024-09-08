import { VariantProps, cva } from "class-variance-authority";
import { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/app/utils/cn";
/**
 * TextBoxなど.
 */

export interface InputAllProps
    extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
    label: string;
    inputType: string;
    colSpan?: string;
    readonly?: boolean;
}

const inputVariants = cva(
    "w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring",
    {
        variants: {
            variant: {
                primary: "hover:bg-sky-100",
                secondary: "hover:bg-slate-100",
                danger: "hover:bg-red-100",
            },
            customSize: {
                sm: "text-sm px-4 py-2",
                md: "text-base px-6 py-4",
                lg: "text-xl px-8 py-10",
            },
        },
        defaultVariants: {
            variant: "primary",
            customSize: "md",
        },
    }
);

const InputAll = ({
    label,
    inputType,
    required,
    readonly,
    name,
    defaultValue,
    className,
    variant,
    customSize,
    colSpan,
    ...props
}: InputAllProps) => {
    //console.log({ ...props });
    return (

        <div className={colSpan} >
            <label htmlFor={name} className="mb-2 inline-block text-sm text-gray-800 sm:text-base">{label}{required ? "*" : ""}</label>

            {inputType === 'textarea' ?
                <textarea name={name}
                    className={cn(inputVariants({ variant, customSize, className }))} >
                    {defaultValue}
                </textarea>

                :
                <input type={inputType} name={name} defaultValue={defaultValue} required={required} readOnly={readonly}
                    className={cn(inputVariants({ variant, customSize, className }))} />
            }

        </div>

    );
};

export { InputAll };