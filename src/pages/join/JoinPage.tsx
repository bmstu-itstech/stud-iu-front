import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { z } from 'zod'

import { Button } from '@/components/ui/button/Button'
import { Checkbox } from '@/components/ui/checkbox/Checkbox'
import { DateField } from '@/components/ui/date-field/DateField'
import { MultiSelect } from '@/components/ui/multi-select/MultiSelect'
import { TextField } from '@/components/ui/text-field/TextField'
import { SuccessIcon } from '@/components/icons'
import { stores } from '@/stores'
import type { ApplicationPayload, FormField } from '@/types/domain'
import styles from './join-page.module.css'

type FieldValue = string | string[]
type FormValues = Record<string, FieldValue>
type FieldErrors = Record<string, string | undefined>

const CONSENT_KEY = 'consent'
const CONSENT_ERROR = 'Подтвердите согласие на обработку персональных данных'
const MULTI_REQUIRED_ERROR = 'Выберите хотя бы один вариант'
const BAD_URL_ERROR = 'Некорректная ссылка'
const GENERIC_URL_PATTERN = '^https?://\\S+$'

function validate(fields: FormField[], values: FormValues, consent: boolean): FieldErrors {
  const shape: Record<string, z.ZodType> = {}
  const input: Record<string, unknown> = { [CONSENT_KEY]: consent }

  for (const field of fields) {
    const value = values[field.key]
    if (field.type === 'multiple_choice') {
      shape[field.key] = field.required
        ? z.array(z.string()).min(1, MULTI_REQUIRED_ERROR)
        : z.array(z.string())
      input[field.key] = Array.isArray(value) ? value : []
    } else {
      let schema = z.string().trim()
      if (field.required) {
        schema = schema.min(1, `Заполните поле «${field.label}»`)
      }
      if (field.type === 'url') {
        const pattern = new RegExp(field.pattern ?? GENERIC_URL_PATTERN)
        const message =
          field.pattern !== null && field.placeholder !== null
            ? `${BAD_URL_ERROR} — пример: ${field.placeholder}`
            : BAD_URL_ERROR
        schema = schema.refine((url) => url === '' || pattern.test(url), message)
      }
      shape[field.key] = schema
      input[field.key] = typeof value === 'string' ? value : ''
    }
  }
  shape[CONSENT_KEY] = z.literal(true, { message: CONSENT_ERROR })

  const result = z.object(shape).safeParse(input)
  const errors: FieldErrors = {}
  if (!result.success) {
    for (const issue of result.error.issues) {
      const key = String(issue.path[0] ?? '')
      if (key !== '' && errors[key] === undefined) errors[key] = issue.message
    }
  }
  return errors
}

export const JoinPage = observer(function JoinPage() {
  const { applications } = stores

  useEffect(() => {
    void applications.loadSchema()
  }, [applications])

  const [values, setValues] = useState<FormValues>({})
  const [errors, setErrors] = useState<FieldErrors>({})
  const [consent, setConsent] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (submitted) window.scrollTo({ top: 0 })
  }, [submitted])

  const fields = applications.schema

  const visibleFields: FormField[] = []
  for (const field of fields ?? []) {
    const dependency = field.dependsOn
    if (dependency !== null) {
      const selected = values[dependency.field]
      if (!Array.isArray(selected) || !selected.includes(dependency.contains)) continue
    }
    visibleFields.push(field)
  }

  function setField(key: string, value: FieldValue): void {
    setValues((previous) => ({ ...previous, [key]: value }))
    setErrors((previous) => ({ ...previous, [key]: undefined }))
  }

  function renderField(field: FormField) {
    const testId = `join-field-${field.key}`
    const value = values[field.key]

    switch (field.type) {
      case 'date':
        return (
          <DateField
            key={field.key}
            label={field.label}
            required={field.required}
            value={typeof value === 'string' ? value : ''}
            onChange={(iso) => setField(field.key, iso)}
            error={errors[field.key]}
            testId={testId}
          />
        )
      case 'multiple_choice':
        return (
          <MultiSelect
            key={field.key}
            label={field.label}
            required={field.required}
            options={field.options ?? []}
            selected={Array.isArray(value) ? value : []}
            onChange={(selected) => setField(field.key, selected)}
            error={errors[field.key]}
            testId={testId}
          />
        )
      default:
        return (
          <TextField
            key={field.key}
            label={field.label}
            required={field.required}
            type={field.type === 'url' ? 'url' : 'text'}
            placeholder={field.placeholder ?? undefined}
            value={typeof value === 'string' ? value : ''}
            onChange={(next) => setField(field.key, next)}
            error={errors[field.key]}
            testId={testId}
          />
        )
    }
  }

  async function handleSubmit(): Promise<void> {
    const fieldErrors = validate(visibleFields, values, consent)
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      return
    }
    setErrors({})

    const payload: ApplicationPayload = {}
    for (const field of visibleFields) {
      const value = values[field.key]
      if (field.type === 'multiple_choice') {
        payload[field.key] = Array.isArray(value) ? value : []
      } else if (typeof value === 'string' && value.trim() !== '') {
        payload[field.key] = value.trim()
      }
    }

    const ok = await applications.submit(payload)
    if (ok) setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className={styles.page}>
        <div className={styles.formCard} data-test-id="form-success">
          <div className={styles.successBlock}>
            <SuccessIcon size={72} className={styles.successIcon} />
            <h1 className="text-subtitle">Заявка отправлена</h1>
            <p className={styles.successText}>
              Спасибо! Свяжемся с тобой в течение пары дней
            </p>
            <Button to="/">На главную</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page} data-test-id="join-page">
      <div className={styles.formCard}>
        <h1 className="text-subtitle" data-test-id="join-title">
          Анкета активиста
        </h1>

        {applications.error !== null && fields === null && (
          <div>
            <p className={styles.error}>{applications.error}</p>
            <Button variant="secondary" onClick={() => void applications.loadSchema(true)}>
              Повторить
            </Button>
          </div>
        )}

        {applications.loading && fields === null && (
          <p data-test-id="page-loading">Загрузка…</p>
        )}

        {fields !== null && (
          <form
            className={styles.form}
            onSubmit={(event) => {
              event.preventDefault()
              void handleSubmit()
            }}
            noValidate
            data-test-id="join-form"
          >
            {visibleFields.map((field) => renderField(field))}

            <Checkbox
              label={
                <>
                  Я даю согласие на обработку моих персональных данных в соответствии с Федеральным
                  законом от 27.07.2006 №&nbsp;152-ФЗ «О&nbsp;персональных данных»
                </>
              }
              checked={consent}
              onChange={(checked) => {
                setConsent(checked)
                setErrors((previous) => ({ ...previous, [CONSENT_KEY]: undefined }))
              }}
              testId="consent-checkbox"
            />
            {errors[CONSENT_KEY] && <p className={styles.error}>{errors[CONSENT_KEY]}</p>}

            {applications.submitError !== null && (
              <p className={styles.error} role="alert" data-test-id="submit-error">
                {applications.submitError}
              </p>
            )}

            <div className={styles.actions}>
              <Button
                type="submit"
                disabled={applications.submitting}
                testId="submit-button"
              >
                {applications.submitting ? 'Отправляем…' : 'Записаться'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
})

export default JoinPage
