import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [guestForm, setGuestForm] = useState({
    name: '',
    response: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const targetDate = new Date('2025-10-10T17:00:00').getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guestForm.name && guestForm.response) {
      setIsSubmitted(true);
    }
  };

  const openMap = () => {
    window.open('https://yandex.ru/maps/?text=Подушкинское+шоссе+9+Одинцово', '_blank');
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Декоративные бантики */}
      <div className="absolute top-10 left-10 text-4xl animate-pulse">🎀</div>
      <div className="absolute top-20 right-20 text-3xl animate-pulse delay-300">🎀</div>
      <div className="absolute top-40 left-1/4 text-2xl animate-pulse delay-500">🎀</div>
      <div className="absolute top-60 right-1/3 text-3xl animate-pulse delay-700">🎀</div>
      <div className="absolute bottom-20 left-20 text-4xl animate-pulse delay-1000">🎀</div>
      <div className="absolute bottom-40 right-16 text-2xl animate-pulse delay-1200">🎀</div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* 1. Заголовок */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <span className="text-6xl">👑</span>
          </div>
          <h1 className="princess-title mb-4">
            Принцесса Злата
          </h1>
          <h2 className="text-2xl font-cormorant font-semibold mb-2">
            18-летие
          </h2>
          <div className="flex justify-center items-center gap-2">
            <span className="text-lg">✨</span>
            <p className="text-lg royal-text">Королевское торжество</p>
            <span className="text-lg">✨</span>
          </div>
        </div>

        {/* 2. Фото принцессы Златы */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="relative inline-block animate-float">
            <img 
              src="https://cdn.poehali.dev/files/7f9f40aa-06c6-49e3-8503-c89fc0c38d8c.jpg"
              alt="Принцесса Злата"
              className="max-w-sm mx-auto rounded-xl shadow-2xl border-4 border-accent hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute -top-4 -right-4 text-4xl animate-bounce">👑</div>
            <div className="absolute -bottom-2 -left-2 text-3xl animate-pulse">✨</div>
          </div>
          <p className="mt-6 text-lg font-cormorant italic text-muted-foreground">
            Её Высочество Принцесса Злата
          </p>
        </div>

        {/* 3. Королевское воззвание */}
        <Card className="max-w-4xl mx-auto mb-12 border-2 border-black animate-fade-in shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <CardContent className="p-8">
            <h3 className="text-2xl font-cormorant font-bold text-center mb-6">
              Воззвание ко Друзьям и Верным Подданным Королевства!
            </h3>
            <div className="royal-text text-justify leading-relaxed space-y-4">
              <p>
                Сие послание разослано по всем землям и герцогствам, дабы известить о великом событии: 
                Её Королевское Высочество, Принцесса Злата Обладательница Золотистых Волос, что ярче солнца, 
                и улыбки, что добрее весеннего дня, достигает совершеннолетия - своих Восемнадцати Вёсен!
              </p>
              
              <p>
                Давным-давно пророчество гласило, что, когда последняя прядь её волос отольёт светом 
                восемнадцатое лето, детство окончится, и начнётся новая, великая глава. Сей день настал!
              </p>
              
              <p>
                Но беда подкралась нежданно: наше сокровище, наша Принцесса, заточила саму себя в высокой 
                башне из учебников, конспектов и грёз о будущем. Её чудесные золотистые волосы, по которым 
                мы все так скучаем, видны лишь изредка.
              </p>
              
              <p>
                Мы созываем всех рыцарей без страха и упрёка, всех фей-крёстных, весёлых трубадуров и 
                отважных подруг - то есть, вас, наши дорогие гости! - чтобы общим весельем разрушить стены 
                рутины и вызволить именинницу на свет Божий, к музыке, танцам и сладкому торту!
              </p>
            </div>
            
            <div className="text-center mt-6">
              <div className="text-4xl mb-2">👑</div>
              <p className="font-cormorant font-semibold text-lg">
                С королевскими почестями и наилучшими пожеланиями
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 4. Дата в сердечке */}
        <Card className="max-w-md mx-auto mb-8 border-2 border-black relative heart-decoration animate-fade-in shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardContent className="p-6 text-center">
            <div className="relative z-10">
              <Icon name="Calendar" className="mx-auto mb-2" size={32} />
              <h3 className="text-xl font-cormorant font-semibold mb-2">Дата торжества</h3>
              <p className="text-3xl font-bold">10.10.2025</p>
              <p className="text-lg mt-2">Сбор гостей в 17:00</p>
            </div>
          </CardContent>
        </Card>

        {/* 5. Таймер обратного отсчета */}
        <Card className="max-w-2xl mx-auto mb-8 border-2 border-black animate-fade-in shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-6">
            <h3 className="text-xl font-cormorant font-semibold text-center mb-4">
              До начала торжества осталось:
            </h3>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div className="bg-accent text-accent-foreground p-4 rounded-lg">
                <div className="text-2xl font-bold">{timeLeft.days}</div>
                <div className="text-sm">дней</div>
              </div>
              <div className="bg-accent text-accent-foreground p-4 rounded-lg">
                <div className="text-2xl font-bold">{timeLeft.hours}</div>
                <div className="text-sm">часов</div>
              </div>
              <div className="bg-accent text-accent-foreground p-4 rounded-lg">
                <div className="text-2xl font-bold">{timeLeft.minutes}</div>
                <div className="text-sm">минут</div>
              </div>
              <div className="bg-accent text-accent-foreground p-4 rounded-lg">
                <div className="text-2xl font-bold">{timeLeft.seconds}</div>
                <div className="text-sm">секунд</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 6. Место проведения */}
        <Card className="max-w-2xl mx-auto mb-8 border-2 border-black animate-fade-in shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-6">
            <h3 className="text-xl font-cormorant font-semibold mb-4 text-center">
              Место торжества
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Icon name="MapPin" size={20} />
                <div>
                  <p className="font-semibold">Ресторан «Загородный очаг»</p>
                  <p className="text-sm text-muted-foreground">зал веранда</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="Navigation" size={20} />
                <p>Подушкинское ш., 9, Одинцово</p>
              </div>
              <Button 
                onClick={openMap}
                variant="outline" 
                className="w-full mt-4"
              >
                <Icon name="Map" className="mr-2" size={16} />
                Открыть карту
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 7. Дресс-код */}
        <Card className="max-w-md mx-auto mb-8 border-2 border-black animate-fade-in shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardContent className="p-6 text-center">
            <Icon name="Shirt" className="mx-auto mb-2" size={32} />
            <h3 className="text-xl font-cormorant font-semibold mb-2">Дресс-код</h3>
            <Badge variant="outline" className="text-lg px-4 py-2">
              18 оттенков черного
            </Badge>
          </CardContent>
        </Card>

        {/* 8. Анкета гостя */}
        <Card className="max-w-md mx-auto mb-8 border-2 border-black animate-fade-in shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-6">
            <h3 className="text-xl font-cormorant font-semibold mb-4 text-center">
              Анкета гостя
            </h3>
            <p className="text-sm text-center mb-4 text-muted-foreground">
              Подтвердите свое присутствие до 05.10.25
            </p>
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Ваше имя и фамилия</Label>
                  <Input
                    id="name"
                    value={guestForm.name}
                    onChange={(e) => setGuestForm(prev => ({...prev, name: e.target.value}))}
                    placeholder="Введите ваше имя"
                    required
                  />
                </div>
                
                <div>
                  <Label>Ваш ответ</Label>
                  <RadioGroup 
                    value={guestForm.response} 
                    onValueChange={(value) => setGuestForm(prev => ({...prev, response: value}))}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="yes" />
                      <Label htmlFor="yes">Буду с радостью 💖</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no">К сожалению меня не будет 😢</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <Button type="submit" className="w-full">
                  Отправить ответ
                </Button>
              </form>
            ) : (
              <div className="text-center">
                <div className="text-4xl mb-2">✅</div>
                <p className="text-lg font-semibold text-green-600">
                  Ваш ответ получен!
                </p>
                <p className="text-sm text-muted-foreground">
                  Спасибо за участие, {guestForm.name}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;