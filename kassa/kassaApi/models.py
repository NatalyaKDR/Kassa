import os
import sys
from PIL import Image
from io import BytesIO
from django.conf import settings
from django.contrib.auth.models import User
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.db import models
from django.utils import timezone
from django.urls import reverse


class Product(models.Model):
    title = models.CharField(max_length=128, verbose_name='title', unique=True)
    category = models.ForeignKey('Category', on_delete=models.CASCADE, verbose_name='category')
    slug = models.SlugField(db_index=True, unique=True, verbose_name='slug')
    barcode = models.IntegerField(verbose_name='barcode')
    description = models.TextField(blank=True, verbose_name='description')
    provider = models.CharField(max_length=128, blank=True, verbose_name='provider')
    price = models.FloatField(verbose_name='price')
    discount = models.IntegerField(default=0, verbose_name='discount %')
    time_create = models.DateTimeField(auto_now_add=True, verbose_name='craete_time')
    time_update = models.DateTimeField(auto_now=True, verbose_name='update_time')
    expiry_date = models.DateField(verbose_name='expiry date')
    image = models.ImageField(upload_to='product_images', blank=True, verbose_name='image')
    quantity = models.FloatField(verbose_name='quantity')
    unit = models.CharField(max_length=128, verbose_name='unit', choices=[('kg', 'Kilogram'), ('pcs', 'Pieces')])

    def save(self, *args, **kwargs):

        if self.image:
            image = Image.open(self.image)
            max_width = 800
            # Конвертируем изображение в режим RGB, если необходимо
            if image.mode != 'RGB':
                image = image.convert('RGB')
            # Определяем новый размер изображения, сохраняя пропорции
            width, height = image.size
            if width > max_width:
                new_height = int(max_width * height / width)
                image = image.resize((max_width, new_height))

            # Сохраняем сжатое изображение в BytesIO
            image_io = BytesIO()
            image.save(image_io, format='JPEG', quality=80)

            # Создаем InMemoryUploadedFile из сжатого изображения
            image_compressed = InMemoryUploadedFile(image_io, 'ImageField', "%s.jpg" % self.image.name.split('.')[0],
                                                    'image/jpeg', sys.getsizeof(image_io), None)

            self.image = image_compressed

        super(Product, self).save(*args, **kwargs)

    class Meta:
        ordering = ['-time_create']

    def __str__(self):
        return self.title


class Category(models.Model):
    title = models.CharField(max_length=128, verbose_name='title', unique=True)
    slug = models.SlugField(db_index=True, unique=True, verbose_name='slug')
    image = models.ImageField(upload_to='categories_images', blank=True, null=True, verbose_name='image')

    def save(self, *args, **kwargs):
        # Открываем новую картинку
        if self.image:
            image = Image.open(self.image)
            max_width = 800
            # Конвертируем изображение в режим RGB, если необходимо
            if image.mode != 'RGB':
                image = image.convert('RGB')
            # Определяем новый размер изображения, сохраняя пропорции
            width, height = image.size
            if width > max_width:
                new_height = int(max_width * height / width)
                image = image.resize((max_width, new_height))

            # Сохраняем сжатое изображение в BytesIO
            image_io = BytesIO()
            image.save(image_io, format='JPEG', quality=80)

            # Создаем InMemoryUploadedFile из сжатого изображения
            image_compressed = InMemoryUploadedFile(image_io, 'ImageField', "%s.jpg" % self.image.name.split('.')[0],
                                                    'image/jpeg', sys.getsizeof(image_io), None)

            self.image = image_compressed

        super(Category, self).save(*args, **kwargs)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = 'Categories'
        ordering = ['title']


class Check(models.Model):
    user = models.ForeignKey(User, default=1, verbose_name='User', on_delete=models.PROTECT)
    time_create = models.DateTimeField(auto_now_add=True, verbose_name='craete_time')
    summ = models.FloatField(verbose_name='Summ')
    products = models.TextField(verbose_name='products')

    class Meta:
        ordering = ['-time_create']

    def __str__(self):
        local_time = timezone.localtime(self.time_create)
        return f"{self.user.username} {local_time.strftime('%d/%m/%Y, %H:%M:%S')} {self.summ}$"
