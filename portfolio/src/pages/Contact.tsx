import { useId, useState, type FormEvent } from 'react';
import { config } from '../config';
import { DimH, DimV } from '../components/Dim';
import { FigRule } from '../components/FigRule';
import type { Strings } from '../i18n/strings';
import type { Viewport } from '../hooks/useViewport';

type Props = { t: Strings; vp: Viewport };

type FieldName = 'name' | 'email' | 'message';
type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;

const EMPTY: Values = { name: '', email: '', message: '' };

/**
 * Deliberately loose: anything with a local part, an @ and a dotted domain.
 * A stricter pattern rejects addresses that are perfectly valid, and the cost
 * of a false negative here is a message that never gets sent.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: Values, t: Strings): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = t.errName;
  if (!values.email.trim()) errors.email = t.errEmail;
  else if (!EMAIL.test(values.email.trim())) errors.email = t.errEmailBad;
  if (!values.message.trim()) errors.message = t.errMessage;
  return errors;
}

export function Contact({ t, vp }: Props) {
  const uid = useId();
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  /** A field only shows its error once the user has left it or tried to send. */
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [sent, setSent] = useState(false);

  const set = (name: FieldName) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [name]: e.target.value }));
    // Editing after a send means a new message is being written.
    if (sent) setSent(false);
  };

  /** Validate on blur, not on keystroke: nobody wants to be corrected mid-word. */
  const blur = (name: FieldName) => () => {
    setTouched((s) => ({ ...s, [name]: true }));
    setErrors(validate(values, t));
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(values, t);
    setErrors(found);
    setTouched({ name: true, email: true, message: true });

    const first = (['name', 'email', 'message'] as const).find((k) => found[k]);
    if (first) {
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }

    const subject = encodeURIComponent(t.mailSubject + (values.name || values.email));
    const body = encodeURIComponent(`${values.message}\n\n— ${values.name} · ${values.email}`);
    window.location.href = `mailto:${config.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const field = (name: FieldName, label: string, rows?: number) => {
    const id = `${uid}-${name}`;
    const error = touched[name] ? errors[name] : undefined;
    const props = {
      id,
      name,
      className: 'field__input',
      value: values[name],
      onChange: set(name),
      onBlur: blur(name),
      required: true,
      'aria-invalid': error ? (true as const) : undefined,
      'aria-describedby': error ? `${id}-err` : undefined,
    };

    return (
      <div className="field">
        <label className="field__label" htmlFor={id}>
          {label}
          <span className="field__req" aria-hidden="true"> ({t.required})</span>
        </label>

        {rows ? (
          <textarea {...props} rows={rows} />
        ) : (
          <input
            {...props}
            type={name === 'email' ? 'email' : 'text'}
            autoComplete={name === 'email' ? 'email' : 'name'}
          />
        )}

        {error && (
          <p className="field__error" id={`${id}-err`} role="alert">
            <span aria-hidden="true">!</span>
            {error}
          </p>
        )}
      </div>
    );
  };

  return (
    <main className="page page--contact">
      <div data-reveal className="reveal">
        <FigRule label={`SHEET 05 — ${t.contactLabel}`} style={{ marginBottom: 24 }} />

        <div data-title-exit className="title-exit">
          <DimV show={vp.rulers} />
          <h1 className="contact__title">{t.contactHeading}</h1>
        </div>

        <DimH style={{ maxWidth: 760, marginTop: 20 }} />
      </div>

      <div className="contact__grid">
        {/* noValidate: the browser's own bubbles cannot be styled and vanish
            on their own, so the messages below replace them. */}
        <form data-reveal className="reveal contact__form" onSubmit={submit} noValidate>
          <DimV show={vp.rulers} />

          {field('name', t.fName)}
          {field('email', t.fEmail)}
          {field('message', t.fMessage, 6)}

          <button type="submit" className="btn btn--primary contact__send">
            {t.send}
          </button>

          {/*
            The button used to swap its own label to "sent", which said nothing
            to a screen reader and stuck there forever. A live region announces
            it, and the address is spelled out in case the mailto: never opens
            a mail client — which is silent when it fails.
          */}
          <p className="contact__sent" role="status" aria-live="polite">
            {sent && (
              <>
                {t.sent} {t.sentHelp}{' '}
                <a href={`mailto:${config.email}`}>{config.email}</a>
              </>
            )}
          </p>
        </form>

        <aside data-reveal className="reveal contact-aside">
          <div className="contact-aside__row">
            <div className="contact-aside__k">EMAIL</div>
            <a className="contact-aside__v contact-aside__v--break" href={`mailto:${config.email}`}>
              {config.email}
            </a>
          </div>

          <div className="contact-aside__row">
            <div className="contact-aside__k">LINKEDIN</div>
            <a className="contact-aside__v" href={config.linkedin} target="_blank" rel="noreferrer">
              /in/eduardo-azuolas
            </a>
          </div>

          <div className="contact-aside__row">
            <div className="contact-aside__k">LOCATION</div>
            <div className="contact-aside__v">São Paulo, Brazil · GMT-3</div>
          </div>

          <div className="contact-aside__row">
            <div className="contact-aside__k">{t.availability}</div>
            <div className="availability">
              <span data-live-dot className="live-dot" aria-hidden="true" />
              <span>{t.availableLabel}</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
