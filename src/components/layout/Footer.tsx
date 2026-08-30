import itsLogo from '@/assets/icons/its-logo.svg'
import socialTgIcon from '@/assets/icons/social-tg.svg'
import socialVkIcon from '@/assets/icons/social-vk.svg'
import { Button } from '@/components/ui/button/Button'
import styles from './footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer} data-test-id="footer">
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <h2 className="text-title">Студенческий совет ИУ</h2>
          <div className={styles.socials}>
            <a
              href="https://vk.com/studsovet_iu"
              target="_blank"
              rel="noreferrer"
              aria-label="VK"
              data-test-id="footer-social-vk"
            >
              <img src={socialVkIcon} width={40} height={40} alt="VK" />
            </a>
            <a
              href="https://t.me/studsovet_iu"
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
              data-test-id="footer-social-tg"
            >
              <img src={socialTgIcon} width={40} height={40} alt="Telegram" />
            </a>
          </div>
        </div>

        <dl className={styles.fields}>
          <div className={styles.field}>
            <dt className={styles.fieldLabel}>Почта:</dt>
            <dd className={styles.fieldValue}>
              <a href="mailto:inbox@stud-iu.ru" data-test-id="footer-email">
                inbox@stud-iu.ru
              </a>
            </dd>
          </div>
          <div className={styles.field}>
            <dt className={styles.fieldLabel}>Адрес:</dt>
            <dd className={styles.fieldValue} data-test-id="footer-address">
              Москва, Бригадирский пер., 13, корп. B7, ауд. 303
            </dd>
          </div>
        </dl>

        <div className={styles.bottom}>
          <div className={styles.actions}>
            <Button to="/join" testId="footer-join">
              Хочу к вам
            </Button>
            <Button href="mailto:inbox@stud-iu.ru" variant="secondary" testId="footer-partner">
              Стать партнёром
            </Button>
          </div>
          <div className={styles.madeBy}>
            <img src={itsLogo} width={50} height={50} alt="ITS Tech" />
            <span className={styles.madeByText}>Сделано в ITS Tech</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
