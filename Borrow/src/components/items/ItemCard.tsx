import { ArrowUpRight, Camera, Gamepad2, Guitar, Package } from "lucide-react";
import { Link } from "react-router-dom";
import type { Item } from "../../types/item";

const categoryIcons = [Guitar, Camera, Gamepad2, Package];

interface ItemCardProps {
  item: Item;
  showOwner?: boolean;
}

export function ItemCard({ item, showOwner = true }: ItemCardProps) {
  const Icon = categoryIcons[item.id % categoryIcons.length];
  const ownerName = "owner" in item && item.owner ? item.owner.name : undefined;

  return (
    <Link className="item-card" to={`/items/${item.id}`}>
      <div className="item-card__topline">
        <span className="item-card__icon"><Icon size={22} strokeWidth={1.8} /></span>
        <span className={`status status--${item.available ? "available" : "unavailable"}`}>
          {item.available ? "Disponível" : "Indisponível"}
        </span>
      </div>
      <div>
        <p className="eyebrow">{item.category}</p>
        <h2>{item.name}</h2>
        <p className="item-card__description">{item.description || "Sem descrição"}</p>
      </div>
      {showOwner && <p className="item-card__owner">Dono: {ownerName || "Você"}</p>}
      <span className="item-card__link">Ver item <ArrowUpRight size={16} /></span>
    </Link>
  );
}
