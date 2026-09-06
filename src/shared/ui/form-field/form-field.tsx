import {
  ComponentProps,
  ComponentPropsWithoutRef,
  createElement,
  ElementType,
  ReactElement,
  ReactNode,
  useId,
} from 'react'
import clsx from 'clsx'

type FieldProperties = {
  children: ReactNode
  id: string
  label: ReactNode
}

function Field({ children, id, label }: FieldProperties) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-bold text-foreground" htmlFor={id}>
        {label}
      </label>
      {children}
    </div>
  )
}

type FieldControlProperties<Element extends ElementType> = {
  as: Element
} & Omit<ComponentPropsWithoutRef<Element>, 'as'>

function FieldControl<Element extends ElementType>({
  as: Component,
  className,
  ...properties
}: FieldControlProperties<Element>): ReactElement {
  return createElement(Component, {
    ...properties,
    className: clsx(
      'w-full rounded-lg border border-input bg-background px-4 font-sans text-foreground transition-colors duration-200 placeholder:text-placeholder focus:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      className,
    ),
  })
}

type TextFieldProperties = Omit<ComponentProps<'input'>, 'id'> & {
  id?: string
  label: ReactNode
}

export function TextField({
  className,
  id,
  label,
  ...properties
}: TextFieldProperties) {
  const generatedId = useId()
  const fieldId = id ?? generatedId

  return (
    <Field id={fieldId} label={label}>
      <FieldControl
        as="input"
        className={clsx('min-h-12', className)}
        id={fieldId}
        {...properties}
      />
    </Field>
  )
}

type TextareaFieldProperties = Omit<ComponentProps<'textarea'>, 'id'> & {
  id?: string
  label: ReactNode
}

export function TextareaField({
  className,
  id,
  label,
  ...properties
}: TextareaFieldProperties) {
  const generatedId = useId()
  const fieldId = id ?? generatedId

  return (
    <Field id={fieldId} label={label}>
      <FieldControl
        as="textarea"
        className={clsx('min-h-40 resize-y py-3', className)}
        id={fieldId}
        {...properties}
      />
    </Field>
  )
}
