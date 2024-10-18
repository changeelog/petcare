'use client'

import { motion } from 'framer-motion'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/ui/Card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/ui/Accordion'
import { Button } from '@/shared/ui/Button'
import { ScrollArea } from '@/shared/ui/ScrollArea'
import { AlertCircle, CheckCircle, HelpCircle } from 'lucide-react'

import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Page Title',
    description: 'Page description',
    openGraph: {
      title: 'Open Graph Title',
      description: 'Open Graph Description',
      url: 'https://www.example.com/page',
      siteName: 'Site Name',
      images: [
        {
          url: 'https://www.example.com/og-image.jpg',
          width: 800,
          height: 600,
          alt: 'Og Image Alt',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Twitter Title',
      description: 'Twitter Description',
      creator: '@username',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

const sections = [
  {
    title: 'Общие положения',
    content:
      'Настоящие Условия использования регулируют отношения между PetCare Portal (далее - "мы", "нас" или "наш") и пользователями нашего сайта (далее - "вы" или "пользователь"). Используя наш сайт, вы соглашаетесь с данными условиями. Если вы не согласны с каким-либо пунктом, пожалуйста, прекратите использование нашего сайта.',
  },
  {
    title: 'Регистрация и учетные записи',
    content:
      'Для использования некоторых функций нашего сайта может потребоваться регистрация. Вы обязуетесь предоставить точную и полную информацию при регистрации и поддерживать ее актуальность. Вы несете ответственность за сохранение конфиденциальности вашей учетной записи и пароля.',
  },
  {
    title: 'Интеллектуальная собственность',
    content:
      'Весь контент на нашем сайте, включая тексты, изображения, логотипы и программный код, является нашей собственностью или собственностью наших лицензиаров и защищен законами об авторском праве. Вы не имеете права использовать, копировать или распространять этот контент без нашего явного разрешения.',
  },
  {
    title: 'Правила поведения пользователей',
    content:
      'Используя наш сайт, вы соглашаетесь не публиковать или передавать любой незаконный, угрожающий, клеветнический, непристойный или иной неприемлемый контент. Мы оставляем за собой право удалять любой контент, который нарушает эти правила, и блокировать доступ пользователям, нарушающим эти условия.',
  },
  {
    title: 'Ограничение ответственности',
    content:
      'Мы стремимся предоставлять точную и актуальную информацию, но не гарантируем ее полноту или безошибочность. Мы не несем ответственности за любые убытки или ущерб, возникшие в результате использования нашего сайта или информации на нем.',
  },
  {
    title: 'Изменения в условиях использования',
    content:
      'Мы оставляем за собой право изменять эти условия использования в любое время. Продолжая использовать наш сайт после внесения изменений, вы соглашаетесь с новыми условиями. Рекомендуем регулярно проверять эту страницу на наличие обновлений.',
  },
  {
    title: 'Применимое право',
    content:
      'Настоящие условия использования регулируются и толкуются в соответствии с законодательством Российской Федерации. Любые споры, возникающие в связи с использованием нашего сайта, подлежат рассмотрению в судах Российской Федерации.',
  },
]

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-6 text-center">
          Условия использования
        </h1>
        <p className="text-xl text-center mb-12 max-w-2xl mx-auto">
          Пожалуйста, внимательно ознакомьтесь с нашими условиями использования.
          Используя PetCare Portal, вы соглашаетесь соблюдать эти условия.
        </p>
      </motion.div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="mr-2 h-5 w-5 text-yellow-500" />
            Важное уведомление
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Настоящие Условия использования представляют собой юридически
            обязывающее соглашение между вами и PetCare Portal. Используя наш
            сайт, вы подтверждаете, что прочитали, поняли и согласны соблюдать
            эти условия. Если вы не согласны с каким-либо пунктом, пожалуйста,
            прекратите использование нашего сайта.
          </p>
        </CardContent>
      </Card>

      <ScrollArea className="h-[500px] rounded-md border p-4">
        <Accordion
          type="single"
          collapsible
          className="w-full"
        >
          {sections.map((section, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
            >
              <AccordionTrigger>{section.title}</AccordionTrigger>
              <AccordionContent>{section.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollArea>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8 text-center"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-center">
              <HelpCircle className="mr-2 h-5 w-5" />
              Остались вопросы?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Если у вас есть какие-либо вопросы или сомнения относительно наших
              Условий использования, пожалуйста, не стесняйтесь обращаться к
              нам. Мы всегда готовы помочь прояснить любые моменты.
            </p>
            <Button>Связаться с нами</Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mt-8 text-center"
      >
        <p className="text-sm text-muted-foreground">
          Последнее обновление: {new Date().toLocaleDateString()}
        </p>
        <div className="flex items-center justify-center mt-4">
          <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
          <p className="text-sm font-medium">
            Используя наш сайт, вы подтверждаете, что прочитали и согласны с
            нашими Условиями использования.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
