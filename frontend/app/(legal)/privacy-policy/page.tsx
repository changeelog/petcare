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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/ui/Tabs'
import { HelpCircle, Lock, Shield } from 'lucide-react'

const sections = [
  {
    title: 'Сбор информации',
    content:
      'Мы собираем личную информацию, которую вы предоставляете нам при регистрации на сайте, создании профиля или использовании наших услуг. Это может включать ваше имя, адрес электронной почты, номер телефона и информацию о ваших питомцах. Мы также автоматически собираем некоторую информацию о вашем устройстве и использовании нашего сайта.',
  },
  {
    title: 'Использование информации',
    content:
      'Мы используем собранную информацию для предоставления, поддержки и улучшения наших услуг, а также для связи с вами. Это включает обработку ваших запросов, отправку уведомлений о наших услугах и предоставление персонализированного опыта использования сайта.',
  },
  {
    title: 'Защита информации',
    content:
      'Мы принимаем разумные меры для защиты вашей личной информации от несанкционированного доступа, использования или раскрытия. Это включает использование шифрования, безопасных серверов и регулярное обновление наших систем безопасности.',
  },
  {
    title: 'Раскрытие информации третьим лицам',
    content:
      'Мы не продаем и не передаем вашу личную информацию третьим лицам, за исключением случаев, описанных в этой политике. Мы можем передавать информацию нашим доверенным партнерам, которые помогают нам в работе сайта и предоставлении услуг, при условии, что они согласны сохранять эту информацию конфиденциальной.',
  },
  {
    title: 'Ваши права',
    content:
      'Вы имеете право на доступ, исправление или удаление вашей личной информации. Вы также можете возразить против обработки вашей информации или запросить ограничение такой обработки. Для реализации этих прав, пожалуйста, свяжитесь с нами.',
  },
  {
    title: 'Изменения в политике конфиденциальности',
    content:
      'Мы можем время от времени обновлять нашу политику конфиденциальности. Мы уведомим вас о любых существенных изменениях путем размещения уведомления на нашем сайте или отправки вам электронного письма.',
  },
]

const dataTypes = [
  { name: 'Личная информация', examples: ['Имя', 'Email', 'Номер телефона'] },
  {
    name: 'Информация о питомцах',
    examples: ['Вид животного', 'Кличка', 'Возраст', 'Медицинская история'],
  },
  {
    name: 'Данные об использовании',
    examples: ['IP-адрес', 'Тип устройства', 'Время посещения сайта'],
  },
  {
    name: 'Финансовая информация',
    examples: ['Данные кредитной карты (если применимо)'],
  },
]

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-6 text-center">
          Политика конфиденциальности
        </h1>
        <p className="text-xl text-center mb-12 max-w-2xl mx-auto">
          Мы ценим вашу конфиденциальность и стремимся защитить вашу личную
          информацию. Эта политика объясняет, как мы собираем, используем и
          защищаем ваши данные.
        </p>
      </motion.div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5 text-green-500" />
            Наше обязательство по защите данных
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            PetCare Portal обязуется защищать вашу конфиденциальность и
            обеспечивать безопасность ваших личных данных. Мы используем
            современные технологии шифрования и строгие процедуры доступа, чтобы
            ваша информация оставалась в безопасности.
          </p>
        </CardContent>
      </Card>

      <Tabs
        defaultValue="policy"
        className="mb-8"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="policy">Политика конфиденциальности</TabsTrigger>
          <TabsTrigger value="data">Типы собираемых данных</TabsTrigger>
        </TabsList>
        <TabsContent value="policy">
          <ScrollArea className="h-[400px] rounded-md border p-4">
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
        </TabsContent>
        <TabsContent value="data">
          <ScrollArea className="h-[400px] rounded-md border p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dataTypes.map((type, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{type.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5">
                      {type.examples.map((example, i) => (
                        <li key={i}>{example}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>

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
              Остались вопросы о конфиденциальности?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Если у вас есть какие-либо вопросы или сомнения относительно нашей
              Политики конфиденциальности, пожалуйста, не стесняйтесь обращаться
              к нам. Мы всегда готовы помочь прояснить любые моменты.
            </p>
            <Button>Связаться с нами по вопросам конфиденциальности</Button>
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
          <Lock className="mr-2 h-5 w-5 text-blue-500" />
          <p className="text-sm font-medium">
            Ваша конфиденциальность важна для нас. Мы постоянно работаем над
            улучшением наших мер безопасности.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
