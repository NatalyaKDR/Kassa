from django.db.models import Q
from django.shortcuts import render
from rest_framework import generics, viewsets, filters
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from kassaApi.models import Product, Category, Check
from kassaApi.serializers import ProductSerializer, CategorySerializer
from django.views.decorators.csrf import csrf_exempt


def index(request):
    return render(request, 'kassaApi/index.html')


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ProductSerializer

    def get_queryset(self):
        get_params = self.request.query_params
        search_param = [i for i in get_params.keys()][0]
        if search_param == 'product':
            search = self.request.query_params.get('product')
            products = Product.objects.filter(Q(title__istartswith=search) |
                                              Q(barcode__istartswith=search))
            return products

        elif search_param == 'cat':
            search = self.request.query_params.get('cat')
            products = Product.objects.filter(category__title=search)
            return products


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CheckPost(APIView):
    renderer_classes = [JSONRenderer]
    def post(self, request):
        purchases = request.data
        text = ''
        summ = 0
        try:
            for purchase in purchases:
                summ += purchase['summPrice']
                text += purchase['title'] + '-' + str(purchase['pcs']) + '-' + str(purchase['summPrice']) + '$\n'
                Check(summ=summ, products=text).save()
                return Response({'message': 'Saved'})
        except:
            return Response({'message': 'Not saved'})

