using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EagleDigital.Common.Model.TenantTwo;
using EagleDigital.CodeFirst.TenantTwo.Repositories;
using EagleDigital.Service.IServices;

namespace EagleDigital.Service.Services
{
    public class SalePromotionService : ISalePromotionService
    {

        private readonly IEntityRepositoryNewTenant<SalePromotion> _salePromotionRepository;
        public SalePromotionService(IEntityRepositoryNewTenant<SalePromotion> salePromotionRepository)
        {
            _salePromotionRepository = salePromotionRepository;
        }

        public IQueryable<SalePromotion> List()
        {
            var salePromotionList = _salePromotionRepository.GetAll().OrderBy(p => p.Name);
            return salePromotionList;
        }

        public SalePromotion Details(int id)
        {
            var salePromotionDetails = _salePromotionRepository.Get(id);
            return salePromotionDetails;
        }

        public SalePromotion Insert(SalePromotion salePromotion)
        {
            var salePromotionDetails = new SalePromotion();
            salePromotionDetails.Name = salePromotion.Name;
            salePromotionDetails.ProductId = salePromotion.ProductId;
            salePromotionDetails = _salePromotionRepository.InsertOnCommit(salePromotionDetails);
            _salePromotionRepository.CommitChanges();
            return salePromotionDetails;
        }

        public SalePromotion Update(SalePromotion salePromotion)
        {
            var salePromotionDetails = _salePromotionRepository.Get(salePromotion.Id);
            salePromotionDetails.Name = salePromotion.Name;
            salePromotionDetails.ProductId = salePromotion.ProductId;
            _salePromotionRepository.CommitChanges();
            return salePromotionDetails;
        }
    }
}
