from django.db.models import Q
from django.shortcuts import render
from django.views import generic
from rest_framework import generics, viewsets, filters
from kassaApi.models import Product, Category
from kassaApi.serializers import ProductSerializer, CategorySerializer


def index(request):
    return render(request,'kassaApi/index.html')


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ProductSerializer
    def get_queryset(self):
        get_params = self.request.query_params
        search_param = [i for i in get_params.keys()][0]
        if search_param == 'product':
            search = self.request.query_params.get('product')
            products = Product.objects.filter(Q(title__istartswith=search)|
                                              Q(barcode__istartswith=search))
            return products

        elif search_param == 'cat':
            search = self.request.query_params.get('cat')
            products = Product.objects.filter(category__title=search)
            return products


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
