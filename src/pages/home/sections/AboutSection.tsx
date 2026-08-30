import { StatCard } from '@/components/cards/StatCard'
import { Button } from '@/components/ui/button/Button'
import { defaultOrgStats } from '@/config/organization'
import { images } from '@/mocks/images'
import styles from './about-section.module.css'

export function AboutSection() {
  return (
    <section className="container home-section" id="about" data-test-id="about-section">
      <div className={styles.content}>
        <div className={styles.caption}>
          <h1 className={`text-title ${styles.title}`}>
            <span className={styles.titleAccent}>Студ_ИУ</span> — это мы.
            <br />
            Наше время — действовать.
          </h1>
          <p className={styles.text}>
            Работаем над развитием IT-сообщества в стенах МГТУ им. Н.Э. Баумана в команде из 250
            человек. На протяжении 3 лет Студенческий совет ИУ объединяет инициативных, креативных
            и горящих своим делом студентов, готовых разрабатывать новые проекты и организовывать
            мероприятия.
          </p>
          <Button to="/join" testId="about-cta">
            Стать активистом
          </Button>
        </div>
        <img
          src={images.about}
          alt="Команда Студенческого совета ИУ"
          className={styles.photo}
          width={464}
          height={238}
        />
      </div>

      <div className={styles.stats} data-test-id="stats-section">
        {defaultOrgStats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>
    </section>
  )
}
