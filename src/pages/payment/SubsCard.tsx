import React from 'react'
import { SubscriptionCardProps } from '../../model/subscription'
import premium from '/assets/images/subs/gold_premium.png';
import basic from '/assets/images/subs/apple_basic.png';

const SubsCard: React.FC<SubscriptionCardProps> = ({plan, isSelected, onSelect}) => {
   return (
      <div className="col-md-6">
         <div className={`card h-100 ${isSelected ? 'border-secondary':''}`}
               style={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'}}
               onClick={() => onSelect(plan.title, plan.price)}>
            <div className="card-body position-relative">
               <img src={plan.title == 'Basic' ? basic:premium} 
                  className="rounded-lg w-24 position-absolute top-0 end-0 m-3" 
                  alt="상품 이미지" 
               />
               <h5 className="card-title fw-bold">{plan.title}</h5>
               <span className="card-text fs-4">₩ {plan.price.toLocaleString()}원</span>
               <span>/월</span>
               <ul className="list-unstyled mt-2">
                  {plan.features.map((feature, i) => (
                     <li key={i}>✔️ {feature}</li>
                  ))}
               </ul>
               <button className="btn btn-success select-plan mt-3">선택하기</button>
            </div>
         </div>
      </div>
   );
}

export default SubsCard