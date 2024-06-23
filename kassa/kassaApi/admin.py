from django.contrib import admin
from .models import Product, Category, Check


class ProductAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ['title']}
class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ['title']}
class CheckAdmin(admin.ModelAdmin):
    list_filter = ['user', 'time_create']
    search_fields = ('products',)


admin.site.register(Product, ProductAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Check, CheckAdmin)
