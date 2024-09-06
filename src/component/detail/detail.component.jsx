import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './detail.style.css';

async function fetchDetailPokemon(id) {
    const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
    const speciesData = await speciesResponse.json();

    const pokemonDetailsResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const pokemonDetails = await pokemonDetailsResponse.json();

    const evolutionResponse = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`);
    const evolutionDetails = await evolutionResponse.json();
    
    console.log(evolutionDetails);

    const pokeId = speciesData.id;
    const koreanName = speciesData.names.find(
      (name) => name.language.name === 'ko'
    );
    const generas = speciesData.genera.find(
      (gen) => gen.language.name === 'ko'
    )?.genus;
    const flavorTexts = speciesData.flavor_text_entries.find(
      (entry) => entry.language.name === 'ko' && entry.version.name === 'x'
    )?.flavor_text;
    const pokeHeight = pokemonDetails.height;
    const pokeWeight = pokemonDetails.weight;
    //const poke_img = pokemonDetails.sprites.versions['generation-v']['black-white'].animated.front_default;
    const poke_img = pokemonDetails.sprites.other['official-artwork'].front_default;
    
    const typesPromises = pokemonDetails.types.map(async (typeInfo) => {
      const typeResponse = await fetch(typeInfo.type.url);
      const typeDetails = await typeResponse.json();
      const koreanType = typeDetails.names.find(
        (type) => type.language.name === 'ko',
      );
      const engType = typeDetails.names.find(
        (type) => type.language.name === 'en',
      );
      
      return {
        name: typeInfo.type.name,
        koreanType: koreanType ? koreanType.name : typeInfo.type.name,
        engType: engType ? engType.name.toLocaleLowerCase() : typeInfo.type.name,
        url: typeInfo.type.url,
      }
    });
    const types = await Promise.all(typesPromises);

    const abilityPromises = pokemonDetails.abilities.map(async (abil) => {
      const abilityResponse = await fetch(abil.ability.url);
      const abilityDetails = await abilityResponse.json();
      const koreanAbility = abilityDetails.names.find(
        (abil) => abil.language.name === 'ko',
      );
      const koreanAbilityInfo = abilityDetails.flavor_text_entries.find(
        (abil) => abil.language.name === 'ko' && abil.version_group.name === 'x-y',
      )?.flavor_text;

      //console.log(koreanAbilityInfo);
      
      return {
        name: abil.name,
        koreanAbility: koreanAbility ? koreanAbility.name : abil.type.name,
        koreanAbilityInfo,
      }
    });
    const abilities = await Promise.all(abilityPromises);

    return {
        pokeId,
        name: koreanName ? koreanName.name : speciesData.name,
        flavorTexts,
        generas,
        poke_img,
        types,
        abilities,
        pokeHeight,
        pokeWeight
    }
    
    
}

const Detail = () => {

    const { id } = useParams();
    const [pokemonDetail, setPokemonDetail] = useState({});
    const { pokeId, name, flavorTexts, generas, poke_img, types, abilities, pokeHeight, pokeWeight } = pokemonDetail;

    useEffect(() => {
        fetchDetailPokemon(id).then((finalData) => {
            setPokemonDetail(finalData);
        });
    }, [id]);

    return (
        <div id="detail">
            <p>NO. {pokeId}</p>
            <p>{name}</p>
            <p>{generas}</p>
            <p>{flavorTexts}</p>
            <div className="detail_img"><img src={poke_img} alt={name} /></div>
            <p>{pokeHeight}</p>
            <p>{pokeWeight}</p>
            <ul className='poke_type'>
            {
                types && types.map((type,index) => {
                return (
                    <li 
                        key={index} 
                        className={`bg_${type.engType}`}
                    >
                        <img src={process.env.PUBLIC_URL + `/img/type_${type.engType}.svg`} alt={type.engType} />
                        <span>{type.koreanType}</span>
                    </li>
                )
                })
            }
            </ul>
            <ul className='poke_ability'>
            {
                abilities && abilities.map((abil,index) => {
                return (
                    <li key={index}>
                        <span>{abil.koreanAbility} {abil.koreanAbilityInfo}</span>
                    </li>
                )
                })
            }
            </ul>
            
        </div>
    );
}

export default Detail;