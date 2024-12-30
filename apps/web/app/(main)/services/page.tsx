'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@pc/ui/components/ui/Button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@pc/ui/components/ui/Card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@pc/ui/components/ui/Dialog'
import { Input } from '@pc/ui/components/ui/Input'
import { Label } from '@pc/ui/components/ui/Label'
import { Tabs, TabsList, TabsTrigger } from '@pc/ui/components/ui/Tabs'
import { Calendar } from '@pc/ui/components/ui/Calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@pc/ui/components/ui/Popover'
import { cn } from '$/lib/utils'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import {
  CalendarIcon,
  Scissors,
  Syringe,
  Stethoscope,
  Bath,
  Search,
} from 'lucide-react'
import { useToast } from '../../../hooks/use-toast'

const services = [
  {
    id: 1,
    name: 'Стрижка',
    icon: Scissors,
    description: 'Профессиональная стрижка для вашего питомца',
    price: 1500,
    category: 'Уход',
  },
  {
    id: 2,
    name: 'Вакцинация',
    icon: Syringe,
    description: 'Важные прививки для здоровья вашего питомца',
    price: 2000,
    category: 'Ветеринария',
  },
  {
    id: 3,
    name: 'Осмотр',
    icon: Stethoscope,
    description: 'Полный медицинский осмотр',
    price: 1000,
    category: 'Ветеринария',
  },
  {
    id: 4,
    name: 'Груминг',
    icon: Bath,
    description: 'Комплексный уход за шерстью и когтями',
    price: 2500,
    category: 'Уход',
  },
]

interface Service {
  id: number
  name: string
  icon: React.ComponentType
  description: string
  price: number
  category: string
}

const serviceCategories = ['Все услуги', 'Уход', 'Ветеринария', 'Специальные']

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('Все услуги')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [bookingDate, setBookingDate] = useState<Date>()
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false)
  const { toast } = useToast()

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (activeCategory === 'Все услуги' || service.category === activeCategory),
  )

  const handleBookService = () => {
    if (selectedService && bookingDate) {
      toast({
        title: 'Услуга забронирована',
        description: `Вы успешно забронировали ${
          selectedService.name
        } на ${format(bookingDate, 'dd MMMM yyyy', { locale: ru })}.`,
      })
      setIsBookingDialogOpen(false)
      setSelectedService(null)
      setBookingDate(undefined)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100">
          Наши услуги
        </h1>
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Выберите услугу</CardTitle>
            <CardDescription>
              Просмотрите наши услуги и забронируйте время
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Search className="w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Поиск услуг..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
              </div>
              <Tabs
                value={activeCategory}
                onValueChange={setActiveCategory}
              >
                <TabsList className="grid w-full grid-cols-4">
                  {serviceCategories.map((category) => (
                    <TabsTrigger
                      key={category}
                      value={category}
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <AnimatePresence>
                {filteredServices.map((service) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <service.icon className="w-6 h-6 text-blue-500" />
                          <span>{service.name}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {service.description}
                        </p>
                        <p className="mt-2 text-lg font-semibold">
                          {service.price} ₽
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button
                          className="w-full"
                          onClick={() => {
                            setSelectedService(service)
                            setIsBookingDialogOpen(true)
                          }}
                        >
                          Забронировать
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </div>
      <Dialog
        open={isBookingDialogOpen}
        onOpenChange={setIsBookingDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Забронировать услугу</DialogTitle>
            <DialogDescription>
              Выберите дату для {selectedService?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Дата</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !bookingDate && 'text-muted-foreground',
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {bookingDate ? (
                      format(bookingDate, 'PPP', { locale: ru })
                    ) : (
                      <span>Выберите дату</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={bookingDate}
                    onSelect={setBookingDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleBookService}>
              Подтвердить бронирование
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
