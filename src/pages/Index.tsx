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
      {/* Декоративные черные бантики */}
      <div className="absolute top-10 left-10 text-4xl animate-pulse opacity-60" style={{filter: 'hue-rotate(280deg) saturate(0) brightness(0)'}}>🎀</div>
      <div className="absolute top-20 right-20 text-3xl animate-pulse delay-300 opacity-60" style={{filter: 'hue-rotate(280deg) saturate(0) brightness(0)'}}>🎀</div>
      <div className="absolute top-40 left-1/4 text-2xl animate-pulse delay-500 opacity-60" style={{filter: 'hue-rotate(280deg) saturate(0) brightness(0)'}}>🎀</div>
      <div className="absolute top-60 right-1/3 text-3xl animate-pulse delay-700 opacity-60" style={{filter: 'hue-rotate(280deg) saturate(0) brightness(0)'}}>🎀</div>
      <div className="absolute bottom-20 left-20 text-4xl animate-pulse delay-1000 opacity-60" style={{filter: 'hue-rotate(280deg) saturate(0) brightness(0)'}}>🎀</div>
      <div className="absolute bottom-40 right-16 text-2xl animate-pulse delay-1200 opacity-60" style={{filter: 'hue-rotate(280deg) saturate(0) brightness(0)'}}>🎀</div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* 1. Заголовок */}
        <div className="text-center mb-12">
          <h1 className="princess-title mb-4">
            Принцесса Злата
          </h1>
          <h2 className="text-2xl font-cormorant font-semibold mb-2">
            18-летие
          </h2>
          <p className="text-lg royal-text">Королевское торжество</p>
        </div>

        {/* 2. Фото принцессы Златы */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="relative inline-block animate-float">
            <img 
              src="https://cdn.poehali.dev/files/7f9f40aa-06c6-49e3-8503-c89fc0c38d8c.jpg"
              alt="Принцесса Злата"
              className="max-w-sm mx-auto rounded-xl shadow-2xl border-4 border-accent hover:scale-105 transition-transform duration-300"
            />

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
              <p className="font-cormorant font-semibold text-lg">
                С королевскими почестями и наилучшими пожеланиями
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 4. Дата в календаре */}
        <Card className="max-w-md mx-auto mb-8 border-2 border-black animate-fade-in shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-cormorant font-semibold mb-6">Дата торжества</h3>
            <div className="bg-white rounded-lg shadow-inner p-4 max-w-xs mx-auto border">
              {/* Заголовок календаря */}
              <div className="bg-red-600 text-white rounded-t-lg -mx-4 -mt-4 mb-2 py-2">
                <p className="text-sm font-semibold">Октябрь 2025</p>
              </div>
              
              {/* Дни недели */}
              <div className="grid grid-cols-7 gap-1 text-xs text-gray-500 mb-2">
                <div>Пн</div>
                <div>Вт</div>
                <div>Ср</div>
                <div>Чт</div>
                <div>Пт</div>
                <div>Сб</div>
                <div>Вс</div>
              </div>
              
              {/* Календарные дни */}
              <div className="grid grid-cols-7 gap-1 text-sm">
                <div className="text-gray-400">29</div>
                <div className="text-gray-400">30</div>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div>7</div>
                <div>8</div>
                <div>9</div>
                {/* Выделенная дата с сердечком */}
                <div className="relative">
                  <div className="w-8 h-8 flex items-center justify-center text-white font-bold relative z-10">
                    10
                  </div>
                  {/* Розовое сердечко */}
                  <div className="absolute inset-0 flex items-center justify-center text-pink-400">
                    <svg width="32" height="28" viewBox="0 0 32 28" fill="currentColor">
                      <path d="M16 28c-.5 0-1-.2-1.3-.6C14.2 26.8 1 15.4 1 8.5 1 4.4 4.4 1 8.5 1c2.5 0 4.8 1.2 6.2 3.2C16.2 2.2 18.5 1 21 1c4.1 0 7.5 3.4 7.5 7.5 0 6.9-13.2 18.3-13.7 18.9-.3.4-.8.6-1.3.6z"/>
                    </svg>
                  </div>
                </div>
                <div>11</div>
                <div>12</div>
                <div>13</div>
                <div>14</div>
                <div>15</div>
                <div>16</div>
                <div>17</div>
                <div>18</div>
                <div>19</div>
                <div>20</div>
                <div>21</div>
                <div>22</div>
                <div>23</div>
                <div>24</div>
                <div>25</div>
                <div>26</div>
                <div>27</div>
                <div>28</div>
                <div>29</div>
                <div>30</div>
                <div>31</div>
                <div className="text-gray-400">1</div>
                <div className="text-gray-400">2</div>
              </div>
            </div>
            <p className="text-lg mt-4 font-semibold">Сбор гостей в 17:00</p>
          </CardContent>
        </Card>

        {/* 5. Таймер обратного отсчета */}
        <Card className="max-w-2xl mx-auto mb-8 border-2 border-black animate-fade-in shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-6">
            <h3 className="text-xl font-cormorant font-semibold text-center mb-4">
              До начала торжества осталось:
            </h3>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div className="bg-pink-200 text-black p-4 rounded-lg border border-pink-300">
                <div className="text-2xl font-bold">{timeLeft.days}</div>
                <div className="text-sm">дней</div>
              </div>
              <div className="bg-pink-200 text-black p-4 rounded-lg border border-pink-300">
                <div className="text-2xl font-bold">{timeLeft.hours}</div>
                <div className="text-sm">часов</div>
              </div>
              <div className="bg-pink-200 text-black p-4 rounded-lg border border-pink-300">
                <div className="text-2xl font-bold">{timeLeft.minutes}</div>
                <div className="text-sm">минут</div>
              </div>
              <div className="bg-pink-200 text-black p-4 rounded-lg border border-pink-300">
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