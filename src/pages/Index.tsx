import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

type UserRole = 'student' | 'teacher' | 'admin';

const Index = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [userName, setUserName] = useState('Александр Иванов');
  
  const courses = [
    {
      id: 1,
      title: 'Основы математики',
      description: 'Фундаментальные концепции алгебры и геометрии',
      progress: 75,
      status: 'active',
      testsCompleted: 3,
      totalTests: 5,
      instructor: 'Марина Петрова',
      category: 'Математика'
    },
    {
      id: 2,
      title: 'История России',
      description: 'От древних времен до современности',
      progress: 45,
      status: 'active',
      testsCompleted: 2,
      totalTests: 6,
      instructor: 'Дмитрий Сидоров',
      category: 'История'
    },
    {
      id: 3,
      title: 'Физика для начинающих',
      description: 'Основы механики и термодинамики',
      progress: 100,
      status: 'completed',
      testsCompleted: 4,
      totalTests: 4,
      instructor: 'Елена Козлова',
      category: 'Физика'
    },
    {
      id: 4,
      title: 'Химия органическая',
      description: 'Углеводороды и их производные',
      progress: 0,
      status: 'available',
      testsCompleted: 0,
      totalTests: 7,
      instructor: 'Игорь Волков',
      category: 'Химия'
    }
  ];

  const testResults = [
    { course: 'Основы математики', score: 89, date: '2024-08-10', passed: true },
    { course: 'История России', score: 76, date: '2024-08-09', passed: false },
    { course: 'Физика для начинающих', score: 95, date: '2024-08-08', passed: true },
  ];

  const studentsList = [
    { id: 1, name: 'Александр Иванов', email: 'alex@example.com', active: true, expiresAt: '2024-12-31', progress: 75 },
    { id: 2, name: 'Мария Петрова', email: 'maria@example.com', active: false, expiresAt: '2024-08-01', progress: 45 },
    { id: 3, name: 'Игорь Сидоров', email: 'igor@example.com', active: true, expiresAt: '2024-11-15', progress: 90 },
  ];

  const getRolePermissions = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return {
          canCreateUsers: true,
          canCreateCourses: true,
          canViewAllResults: true,
          canManageSystem: true,
          canManageStudents: true,
          canAssignTests: true,
          hasLibrary: false,
          canTakeTests: false,
          showTabs: ['dashboard', 'courses', 'results', 'students', 'admin'],
          title: 'Администратор'
        };
      case 'teacher':
        return {
          canCreateUsers: false,
          canCreateCourses: false,
          canViewAllResults: true,
          canManageSystem: false,
          canManageStudents: true,
          canAssignTests: true,
          hasLibrary: false,
          canTakeTests: false,
          showTabs: ['dashboard', 'courses', 'results', 'students'],
          title: 'Преподаватель'
        };
      default:
        return {
          canCreateUsers: false,
          canCreateCourses: false,
          canViewAllResults: false,
          canManageSystem: false,
          canManageStudents: false,
          canAssignTests: false,
          hasLibrary: false,
          canTakeTests: true,
          showTabs: ['dashboard', 'courses', 'results'],
          title: 'Ученик'
        };
    }
  };

  const permissions = getRolePermissions(currentRole);

  const getTabsToShow = () => {
    const baseTabs = [
      { value: 'dashboard', label: 'Дашборд', icon: 'Home' },
      { value: 'courses', label: 'Курсы', icon: 'BookOpen' },
      { value: 'results', label: 'Результаты', icon: 'BarChart3' }
    ];

    if (permissions.canManageStudents) {
      baseTabs.push({ value: 'students', label: 'Ученики', icon: 'Users' });
    }

    if (permissions.canManageSystem) {
      baseTabs.push({ value: 'admin', label: 'Админка', icon: 'Settings' });
    }

    return baseTabs;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Icon name="GraduationCap" size={32} className="text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">EduPlatform</h1>
                <p className="text-sm text-gray-500">Образовательная платформа</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Role Switcher */}
              <div className="flex space-x-2">
                <Button
                  variant={currentRole === 'student' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentRole('student')}
                  className="animate-scale-in"
                >
                  <Icon name="User" size={16} className="mr-1" />
                  Ученик
                </Button>
                <Button
                  variant={currentRole === 'teacher' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentRole('teacher')}
                  className="animate-scale-in"
                >
                  <Icon name="Users" size={16} className="mr-1" />
                  Учитель
                </Button>
                <Button
                  variant={currentRole === 'admin' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentRole('admin')}
                  className="animate-scale-in"
                >
                  <Icon name="Shield" size={16} className="mr-1" />
                  Админ
                </Button>
              </div>

              <div className="flex items-center space-x-3">
                <Badge variant="secondary">{permissions.title}</Badge>
                <Avatar>
                  <AvatarImage src="/placeholder.svg" alt={userName} />
                  <AvatarFallback>АИ</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-gray-900">{userName}</p>
                  <p className="text-xs text-gray-500">{permissions.title}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className={`grid w-full grid-cols-${getTabsToShow().length} mb-8`}>
            {getTabsToShow().map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="flex items-center space-x-2">
                <Icon name={tab.icon as any} size={16} />
                <span>{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Активные курсы</p>
                      <p className="text-3xl font-bold text-gray-900">
                        {courses.filter(c => c.status === 'active').length}
                      </p>
                    </div>
                    <Icon name="BookOpen" size={32} className="text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {currentRole === 'student' ? 'Завершено' : 'Всего учеников'}
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        {currentRole === 'student' ? 
                          courses.filter(c => c.status === 'completed').length :
                          studentsList.length
                        }
                      </p>
                    </div>
                    <Icon name={currentRole === 'student' ? "CheckCircle" : "Users"} size={32} className="text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {currentRole === 'student' ? 'Тесты пройдено' : 'Активных учеников'}
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        {currentRole === 'student' ? 
                          courses.reduce((acc, c) => acc + c.testsCompleted, 0) :
                          studentsList.filter(s => s.active).length
                        }
                      </p>
                    </div>
                    <Icon name={currentRole === 'student' ? "FileText" : "UserCheck"} size={32} className="text-purple-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {currentRole === 'student' ? 'Средний балл' : 'Курсов в системе'}
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        {currentRole === 'student' ? 
                          `${Math.round(testResults.reduce((acc, r) => acc + r.score, 0) / testResults.length)}%` :
                          courses.length
                        }
                      </p>
                    </div>
                    <Icon name={currentRole === 'student' ? "TrendingUp" : "BookText"} size={32} className="text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {currentRole === 'student' ? 'Текущие курсы' : 'Статистика учеников'}
                  </CardTitle>
                  <CardDescription>
                    {currentRole === 'student' ? 
                      'Ваш прогресс по активным курсам' : 
                      'Прогресс обучения ваших учеников'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentRole === 'student' ? (
                    courses.filter(c => c.status === 'active').map(course => (
                      <div key={course.id} className="p-4 rounded-lg border bg-card">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{course.title}</h3>
                          <Badge variant={course.progress === 100 ? 'default' : 'secondary'}>
                            {course.progress}%
                          </Badge>
                        </div>
                        <Progress value={course.progress} className="mb-2" />
                        <p className="text-sm text-gray-600">{course.testsCompleted} из {course.totalTests} тестов</p>
                      </div>
                    ))
                  ) : (
                    studentsList.filter(s => s.active).map(student => (
                      <div key={student.id} className="p-4 rounded-lg border bg-card">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{student.name}</h3>
                          <Badge variant="default">{student.progress}%</Badge>
                        </div>
                        <Progress value={student.progress} className="mb-2" />
                        <p className="text-sm text-gray-600">Активен до: {student.expiresAt}</p>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Последние результаты</CardTitle>
                  <CardDescription>
                    {currentRole === 'student' ? 
                      'Результаты недавно пройденных тестов' : 
                      'Недавние результаты учеников'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {testResults.map((result, index) => (
                    <div key={index} className="flex justify-between items-center p-4 rounded-lg border bg-card">
                      <div>
                        <p className="font-medium">{result.course}</p>
                        <p className="text-sm text-gray-500">{result.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <Badge variant={result.passed ? 'default' : 'destructive'}>
                            {result.score}%
                          </Badge>
                          {result.passed ? 
                            <Icon name="CheckCircle" size={16} className="text-green-500" /> : 
                            <Icon name="XCircle" size={16} className="text-red-500" />
                          }
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Courses */}
          <TabsContent value="courses" className="animate-fade-in">
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Курсы</h2>
                <p className="text-gray-600">
                  {currentRole === 'student' ? 
                    'Изучайте новые знания и проходите тесты' :
                    'Управляйте курсами и назначайте тесты ученикам'
                  }
                </p>
              </div>
              {permissions.canCreateCourses && (
                <Button className="flex items-center space-x-2">
                  <Icon name="Plus" size={16} />
                  <span>Создать курс</span>
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map(course => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <Badge variant="outline">{course.category}</Badge>
                      <Badge variant={course.status === 'completed' ? 'default' : 
                                   course.status === 'active' ? 'secondary' : 'outline'}>
                        {course.status === 'completed' ? 'Завершен' :
                         course.status === 'active' ? 'Активен' : 'Доступен'}
                      </Badge>
                    </div>
                    <CardTitle className="mt-2">{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {currentRole === 'student' && (
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Прогресс</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} />
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>Преподаватель: {course.instructor}</span>
                        <span>{course.testsCompleted}/{course.totalTests} тестов</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        {currentRole === 'student' ? (
                          <>
                            <Button variant="outline" size="sm" className="flex-1">
                              <Icon name="BookOpen" size={14} className="mr-1" />
                              Изучить
                            </Button>
                            <Button variant="default" size="sm" className="flex-1">
                              <Icon name="FileText" size={14} className="mr-1" />
                              Тест
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button variant="outline" size="sm" className="flex-1">
                              <Icon name="Edit" size={14} className="mr-1" />
                              Редактировать
                            </Button>
                            <Button variant="default" size="sm" className="flex-1">
                              <Icon name="UserPlus" size={14} className="mr-1" />
                              Назначить
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Results */}
          <TabsContent value="results" className="animate-fade-in">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Результаты тестирования</h2>
              <p className="text-gray-600">
                {currentRole === 'student' ? 
                  'Анализ вашей успеваемости и прогресса' :
                  'Результаты тестов всех учеников'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Детальные результаты</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {testResults.map((result, index) => (
                      <div key={index} className="p-4 rounded-lg border bg-card">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{result.course}</h3>
                          <Badge variant={result.passed ? 'default' : 'destructive'}>
                            {result.passed ? 'Пройден' : 'Не пройден'}
                          </Badge>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Дата: {result.date}</span>
                          <span>Результат: {result.score}%</span>
                        </div>
                        <Progress value={result.score} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Аналитика</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-3">Прогресс по предметам</h4>
                      <div className="space-y-3">
                        {['Математика', 'История', 'Физика', 'Химия'].map((subject, index) => {
                          const progress = [89, 76, 95, 0][index];
                          return (
                            <div key={subject}>
                              <div className="flex justify-between text-sm mb-1">
                                <span>{subject}</span>
                                <span>{progress}%</span>
                              </div>
                              <Progress value={progress} />
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 rounded-lg bg-green-50">
                        <p className="text-2xl font-bold text-green-600">85%</p>
                        <p className="text-sm text-green-600">Средний балл</p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-blue-50">
                        <p className="text-2xl font-bold text-blue-600">12</p>
                        <p className="text-sm text-blue-600">Тестов пройдено</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Students Management */}
          {permissions.canManageStudents && (
            <TabsContent value="students" className="animate-fade-in">
              <div className="mb-6 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Управление учениками</h2>
                  <p className="text-gray-600">Создание и управление учетными записями учеников</p>
                </div>
                <Button className="flex items-center space-x-2">
                  <Icon name="UserPlus" size={16} />
                  <span>Добавить ученика</span>
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Список учеников</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {studentsList.map(student => (
                          <div key={student.id} className="p-4 rounded-lg border bg-card">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h3 className="font-medium">{student.name}</h3>
                                <p className="text-sm text-gray-600">{student.email}</p>
                                <p className="text-xs text-gray-500">
                                  Активен до: {student.expiresAt}
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant={student.active ? 'default' : 'secondary'}>
                                  {student.active ? 'Активен' : 'Неактивен'}
                                </Badge>
                              </div>
                            </div>
                            <div className="mb-3">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Прогресс обучения</span>
                                <span>{student.progress}%</span>
                              </div>
                              <Progress value={student.progress} />
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Icon name="Edit" size={14} className="mr-1" />
                                Редактировать
                              </Button>
                              <Button variant="outline" size="sm">
                                <Icon name="PlayCircle" size={14} className="mr-1" />
                                Назначить тест
                              </Button>
                              {!student.active && (
                                <Button variant="default" size="sm">
                                  <Icon name="UserCheck" size={14} className="mr-1" />
                                  Активировать
                                </Button>
                              )}
                              {permissions.canCreateUsers && (
                                <Button variant="destructive" size="sm">
                                  <Icon name="UserX" size={14} className="mr-1" />
                                  Удалить
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Создание ученика</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="studentName">Имя ученика</Label>
                        <Input id="studentName" placeholder="Введите имя" />
                      </div>
                      <div>
                        <Label htmlFor="studentEmail">Email</Label>
                        <Input id="studentEmail" type="email" placeholder="email@example.com" />
                      </div>
                      <div>
                        <Label htmlFor="expirationDate">Активен до</Label>
                        <Input id="expirationDate" type="date" />
                      </div>
                      <Button className="w-full">
                        <Icon name="Plus" size={16} className="mr-2" />
                        Создать ученика
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Быстрые действия</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Icon name="UserCheck" size={16} className="mr-2" />
                        Активировать всех
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Icon name="FileText" size={16} className="mr-2" />
                        Массовое назначение тестов
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Icon name="Download" size={16} className="mr-2" />
                        Экспорт результатов
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          )}

          {/* Admin Panel */}
          {permissions.canManageSystem && (
            <TabsContent value="admin" className="animate-fade-in">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Администрирование</h2>
                <p className="text-gray-600">Управление системой, пользователями и курсами</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Управление пользователями</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="UserPlus" size={16} className="mr-2" />
                      Создать ученика
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="Users" size={16} className="mr-2" />
                      Создать учителя
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="Shield" size={16} className="mr-2" />
                      Создать администратора
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="List" size={16} className="mr-2" />
                      Список всех пользователей
                    </Button>
                    <Button variant="destructive" className="w-full justify-start">
                      <Icon name="UserX" size={16} className="mr-2" />
                      Удаление пользователей
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Управление курсами</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="Plus" size={16} className="mr-2" />
                      Создать курс
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="Edit" size={16} className="mr-2" />
                      Редактировать курсы
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="FileText" size={16} className="mr-2" />
                      Управление тестами в курсах
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="Upload" size={16} className="mr-2" />
                      Загрузить материалы
                    </Button>
                    <Button variant="destructive" className="w-full justify-start">
                      <Icon name="Trash2" size={16} className="mr-2" />
                      Удаление курсов
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Системная статистика</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm">Всего пользователей:</span>
                        <span className="font-medium">247</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Учителей:</span>
                        <span className="font-medium">12</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Активных учеников:</span>
                        <span className="font-medium">218</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Курсов в системе:</span>
                        <span className="font-medium">18</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Тестов в курсах:</span>
                        <span className="font-medium">156</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Активность сегодня:</span>
                        <span className="font-medium">89%</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      <Icon name="BarChart3" size={16} className="mr-2" />
                      Подробная статистика
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  );
};

export default Index;