'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@pc/ui/components/ui/Button'
import { Input } from '@pc/ui/components/ui/Input'
import { Label } from '@pc/ui/components/ui/Label'
import { Avatar, AvatarFallback, AvatarImage } from '@pc/ui/components/ui/Avatar'
import { Card, CardContent, CardHeader } from '@pc/ui/components/ui/Card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@pc/ui/components/ui/Dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@pc/ui/components/ui/Select'
import { Switch } from '@pc/ui/components/ui/Switch'
import { Tabs, TabsList, TabsTrigger } from '@pc/ui/components/ui/Tabs'
import { Calendar } from '@pc/ui/components/ui/Calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@pc/ui/components/ui/Popover'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@pc/ui/components/ui/AlertDialog'
import { cn } from '$/lib/utils'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import {
  Edit2,
  Save,
  Camera,
  PlusCircle,
  Trash2,
  Cat,
  Dog,
  Bird,
  Mouse,
  Rabbit,
  UserCircle,
  PawPrint,
  Calendar as CalendarIcon,
  Settings,
  Bell,
  Mail,
  Lock,
} from 'lucide-react'
import { useToast } from '../../../hooks/use-toast'

const petTypes = [
  { name: 'Кошка', icon: Cat },
  { name: 'Собака', icon: Dog },
  { name: 'Птица', icon: Bird },
  { name: 'Грызун', icon: Mouse },
  { name: 'Кролик', icon: Rabbit },
]

const services = ['Стрижка', 'Вакцинация', 'Осмотр', 'Груминг']

const inputVariants = {
  readonly: { backgroundColor: 'transparent', borderColor: 'transparent' },
  editable: {
    backgroundColor: 'var(--input-background)',
    borderColor: 'var(--input-border)',
  },
}

const petVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export default function Profile() {
  const [activeTab, setActiveTab] = useState('personal')
  const [isEditing, setIsEditing] = useState(false)
  const [userInfo, setUserInfo] = useState({
    name: 'Иван Иванов',
    email: 'ivan@example.com',
    phone: '+7 (999) 123-45-67',
  })
  const [pets, setPets] = useState([
    { id: 1, name: 'Барсик', type: 'Кошка', age: 3 },
    { id: 2, name: 'Рекс', type: 'Собака', age: 5 },
  ])
  const [newPet, setNewPet] = useState({ name: '', type: '', age: '' })
  const [isPetDialogOpen, setIsPetDialogOpen] = useState(false)
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      service: 'Стрижка',
      date: new Date(),
      status: 'предстоит',
    },
    {
      id: 2,
      service: 'Вакцинация',
      date: new Date(),
      status: 'завершено',
    },
  ])
  const [newAppointment, setNewAppointment] = useState({
    service: '',
    date: new Date(),
  })
  const [isAppointmentDialogOpen, setIsAppointmentDialogOpen] = useState(false)
  const [settings, setSettings] = useState({
    notifications: true,
    newsletter: false,
  })
  const { toast } = useToast()

  const handleSavePersonalInfo = () => {
    setIsEditing(false)
    toast({
      title: 'Профиль обновлен',
      description: 'Ваша личная информация была успешно сохранена.',
    })
  }

  const handleAddPet = () => {
    if (newPet.name && newPet.type && newPet.age) {
      setPets([...pets, { ...newPet, id: Date.now(), age: Number(newPet.age) }])
      setNewPet({ name: '', type: '', age: '' })
      setIsPetDialogOpen(false)
      toast({
        title: 'Питомец добавлен',
        description: `${newPet.name} успешно добавлен в ваш список питомцев.`,
      })
    }
  }

  const handleDeletePet = (id: number) => {
    const petToDelete = pets.find((pet) => pet.id === id)
    setPets(pets.filter((pet) => pet.id !== id))
    toast({
      title: 'Питомец удален',
      description: `${petToDelete?.name} был удален из вашего списка питомцев.`,
      variant: 'destructive',
    })
  }

  const handleAddAppointment = () => {
    if (newAppointment.service && newAppointment.date) {
      setAppointments([
        ...appointments,
        { ...newAppointment, id: Date.now(), status: 'предстоит' },
      ])
      setNewAppointment({ service: '', date: new Date() })
      setIsAppointmentDialogOpen(false)
      toast({
        title: 'Запись создана',
        description: `Вы успешно записались на ${newAppointment.service}.`,
      })
    }
  }

  const handleDeleteAppointment = (id: number) => {
    const appointmentToDelete = appointments.find(
      (appointment) => appointment.id === id,
    )
    setAppointments(appointments.filter((appointment) => appointment.id !== id))
    toast({
      title: 'Запись удалена',
      description: `Запись на ${appointmentToDelete?.service} была удалена.`,
      variant: 'destructive',
    })
  }

  const handleSettingChange = (setting: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [setting]: !prev[setting] }))
    toast({
      title: 'Настройки обновлены',
      description: `Настройка "${setting}" была изменена.`,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100">
          Профиль
        </h1>
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger
                  value="personal"
                  className="flex items-center space-x-2"
                >
                  <UserCircle className="w-5 h-5" />
                  <span>Личная информация</span>
                </TabsTrigger>
                <TabsTrigger
                  value="pets"
                  className="flex items-center space-x-2"
                >
                  <PawPrint className="w-5 h-5" />
                  <span>Питомцы</span>
                </TabsTrigger>
                <TabsTrigger
                  value="appointments"
                  className="flex items-center space-x-2"
                >
                  <CalendarIcon className="w-5 h-5" />
                  <span>Записи</span>
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="flex items-center space-x-2"
                >
                  <Settings className="w-5 h-5" />
                  <span>Настройки</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'personal' && (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-24 w-24 border-2 border-blue-500 dark:border-blue-400">
                        <AvatarImage
                          src="/placeholder.svg?height=96&width=96"
                          alt={userInfo.name}
                        />
                        <AvatarFallback>{userInfo.name[0]}</AvatarFallback>
                      </Avatar>
                      <Button
                        variant="outline"
                        className="relative overflow-hidden"
                      >
                        <input
                          type="file"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={() =>
                            toast({
                              title: 'Фото обновлено',
                              description: 'Ваше новое фото профиля загружено.',
                            })
                          }
                        />
                        <Camera className="mr-2 h-4 w-4" />
                        Изменить фото
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {Object.entries(userInfo).map(([key, value]) => (
                        <div
                          key={key}
                          className="space-y-2"
                        >
                          <Label
                            htmlFor={key}
                            className="text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            {key === 'name'
                              ? 'Имя'
                              : key === 'email'
                              ? 'Email'
                              : 'Телефон'}
                          </Label>
                          <motion.div
                            initial="readonly"
                            animate={isEditing ? 'editable' : 'readonly'}
                            variants={inputVariants}
                          >
                            <Input
                              id={key}
                              type={key === 'email' ? 'email' : 'text'}
                              value={value}
                              onChange={(e) =>
                                setUserInfo({
                                  ...userInfo,
                                  [key]: e.target.value,
                                })
                              }
                              disabled={!isEditing}
                              className="transition-all duration-300 ease-in-out"
                            />
                          </motion.div>
                        </div>
                      ))}
                    </div>
                    <Button
                      onClick={() =>
                        isEditing
                          ? handleSavePersonalInfo()
                          : setIsEditing(true)
                      }
                      className="w-full sm:w-auto"
                    >
                      {isEditing ? (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Сохранить
                        </>
                      ) : (
                        <>
                          <Edit2 className="mr-2 h-4 w-4" />
                          Редактировать
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {activeTab === 'pets' && (
                  <div className="space-y-6">
                    <AnimatePresence>
                      {pets.map((pet) => {
                        const PetIcon =
                          petTypes.find((type) => type.name === pet.type)
                            ?.icon || Cat
                        return (
                          <motion.div
                            key={pet.id}
                            variants={petVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                                <PetIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                                  {pet.name}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {pet.type}, {pet.age} лет
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeletePet(pet.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        )
                      })}
                    </AnimatePresence>
                    <Dialog
                      open={isPetDialogOpen}
                      onOpenChange={setIsPetDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button className="w-full">
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Добавить питомца
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Добавить нового питомца</DialogTitle>
                          <DialogDescription>
                            Введите информацию о вашем питомце
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="pet-name">Имя питомца</Label>
                            <Input
                              id="pet-name"
                              value={newPet.name}
                              onChange={(e) =>
                                setNewPet({ ...newPet, name: e.target.value })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="pet-type">Тип питомца</Label>
                            <Select
                              value={newPet.type}
                              onValueChange={(value) =>
                                setNewPet({ ...newPet, type: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите тип питомца" />
                              </SelectTrigger>
                              <SelectContent>
                                {petTypes.map((type) => (
                                  <SelectItem
                                    key={type.name}
                                    value={type.name}
                                  >
                                    <div className="flex items-center">
                                      <type.icon className="mr-2 h-4 w-4" />
                                      {type.name}
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="pet-age">Возраст питомца</Label>
                            <Input
                              id="pet-age"
                              type="number"
                              value={newPet.age}
                              onChange={(e) =>
                                setNewPet({ ...newPet, age: e.target.value })
                              }
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button onClick={handleAddPet}>Добавить</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}

                {activeTab === 'appointments' && (
                  <div className="space-y-6">
                    <AnimatePresence>
                      {appointments.map((appointment) => (
                        <motion.div
                          key={appointment.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{
                            opacity: 0,
                            y: -20,
                            transition: { duration: 0.2 },
                          }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm"
                        >
                          <div>
                            <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                              {appointment.service}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {format(appointment.date, 'dd MMMM yyyy', {
                                locale: ru,
                              })}
                            </p>
                            <span
                              className={cn(
                                'inline-block px-2 py-1 text-xs rounded-full',
                                appointment.status === 'предстоит'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-green-100 text-green-800',
                              )}
                            >
                              {appointment.status}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              handleDeleteAppointment(appointment.id)
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    <Dialog
                      open={isAppointmentDialogOpen}
                      onOpenChange={setIsAppointmentDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button className="w-full">
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Создать запись
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Создать новую запись</DialogTitle>
                          <DialogDescription>
                            Выберите услугу и дату
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="service">Услуга</Label>
                            <Select
                              value={newAppointment.service}
                              onValueChange={(value) =>
                                setNewAppointment({
                                  ...newAppointment,
                                  service: value,
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите услугу" />
                              </SelectTrigger>
                              <SelectContent>
                                {services.map((service) => (
                                  <SelectItem
                                    key={service}
                                    value={service}
                                  >
                                    {service}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Дата</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={'outline'}
                                  className={cn(
                                    'w-full justify-start text-left font-normal',
                                    !newAppointment.date &&
                                      'text-muted-foreground',
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {newAppointment.date ? (
                                    format(newAppointment.date, 'PPP', {
                                      locale: ru,
                                    })
                                  ) : (
                                    <span>Выберите дату</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={newAppointment.date}
                                  onSelect={(date) =>
                                    date &&
                                    setNewAppointment({
                                      ...newAppointment,
                                      date,
                                    })
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button onClick={handleAddAppointment}>
                            Создать запись
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Bell className="h-4 w-4" />
                          <Label htmlFor="notifications">
                            Включить уведомления
                          </Label>
                        </div>
                        <Switch
                          id="notifications"
                          checked={settings.notifications}
                          onCheckedChange={() =>
                            handleSettingChange('notifications')
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4" />
                          <Label htmlFor="newsletter">
                            Подписка на рассылку
                          </Label>
                        </div>
                        <Switch
                          id="newsletter"
                          checked={settings.newsletter}
                          onCheckedChange={() =>
                            handleSettingChange('newsletter')
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">
                        Изменение пароля
                      </h3>
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Текущий пароль</Label>
                        <Input
                          id="current-password"
                          type="password"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">Новый пароль</Label>
                        <Input
                          id="new-password"
                          type="password"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">
                          Подтвердите новый пароль
                        </Label>
                        <Input
                          id="confirm-password"
                          type="password"
                        />
                      </div>
                      <Button>
                        <Lock className="mr-2 h-4 w-4" />
                        Изменить пароль
                      </Button>
                    </div>
                    <div className="pt-6 border-t">
                      <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">
                        Опасная зона
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Удаление аккаунта приведет к безвозвратной потере всех
                        данных.
                      </p>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            className="mt-4"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Удалить аккаунт
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Это действие не может быть отменено. Оно навсегда
                              удалит ваш аккаунт и все связанные данные.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Отмена</AlertDialogCancel>
                            <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                              Удалить
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
